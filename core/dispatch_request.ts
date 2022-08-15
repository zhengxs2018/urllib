// deno-lint-ignore-file
import { transformData } from "../common/mod.ts";
import type { HttpRequestOptions, HttpResponse } from "../types/mod.ts";

import type { HttpClient } from "./http_client.ts";
import { HttpException } from "./http_exception.ts";

import { createHttpRequest } from "./create_http_request.ts";
import { createHttpResponse } from "./create_http_response.ts";

/**
 * @internal
 */
export const dispatchRequest = async <T = any, R = HttpResponse<T>>(
  client: HttpClient,
  init: RequestInfo | URL | undefined,
  config: HttpRequestOptions,
): Promise<R> => {
  const request = await client.interceptors.request.apply(
    createHttpRequest(init, config),
  );

  const response = await createHttpResponse(request, config);

  try {
    const data = await transformData(response, config);

    return client.interceptors.response.apply({
      config,
      response,
      request,
      data,
      headers: response.headers,
      throwError(reason: string | Error, code = -1) {
        HttpException.throw(reason, code, config, request, response);
      },
    } as unknown as R);
  } catch (reason) {
    HttpException.throw(reason, -1, config, request, response);
  }
};
