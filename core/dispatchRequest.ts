// deno-lint-ignore-file
import { HttpException } from "../common/HttpException.ts";

import type { HttpClient } from "../types/client.ts";
import type { HttpRequestOptions } from "../types/request.ts";
import type { HttpResponse } from "../types/response.ts";

import { createRequest } from "./createRequest.ts";
import { transformData } from "./transformData.ts";

export const dispatchRequest = async <T = any, R = HttpResponse<T>>(
  client: HttpClient,
  init: RequestInfo | URL | undefined,
  config: HttpRequestOptions,
): Promise<R> => {
  const request = await createRequest(client, init, config);
  const body = config.body == null ? undefined : config.body;

  const response = await fetch(request, { body });

  if (config.validateStatus(response.status, response) === false) {
    throw new HttpException(
      "Request failed with status code " + response.status,
      -1,
      config,
      request,
      response,
    );
  }

  try {
    const data = await transformData(response, config);
    return client.interceptors.response.apply({
      config,
      response,
      request,
      data,
      status: response.status,
      headers: response.headers,
      throw(reason: string | Error, code = -1) {
        HttpException.throw(reason, code, config, request, response);
      },
    } as unknown as R);
  } catch (reason) {
    HttpException.throw(reason, -1, config, request, response);
  }
};
