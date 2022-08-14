// deno-lint-ignore-file
import type { HttpClient } from "../types/client.ts";
import type { HttpRequestConfig } from "../types/request.ts";
import type { HttpResponse } from "../types/response.ts";

import { dispatchRequest } from "./dispatchRequest.ts";
import { normalizeRequestConfig } from "./normalizeRequestConfig.ts";

export const withRequest = <T = any, R = HttpResponse<T>>(
  client: HttpClient,
  init: RequestInfo | URL | HttpRequestConfig,
  config?: HttpRequestConfig,
): Promise<R> => {
  const [requestInfo, options] = normalizeRequestConfig(client, init, config);

  const promise = client.interceptors.config.apply(options);

  return promise.then((config) => dispatchRequest(client, requestInfo, config));
};
