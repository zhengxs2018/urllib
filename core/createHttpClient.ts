import type { HttpClient, HttpClientConfig } from "../types/client.ts";

import { createInterceptorManager } from "./createInterceptorManager.ts";
import { resolveHttpClientOptions } from "./resolveHttpClientOptions.ts";

import { toURL } from "../common/toURL.ts";
import { isHttpException } from "../common/isHttpException.ts";

import { withRequest } from "./withRequest.ts";

export const createHttpClient = (config: HttpClientConfig): HttpClient => {
  const options = resolveHttpClientOptions(config);

  const client: HttpClient = {
    options,
    interceptors: {
      config: createInterceptorManager(),
      request: createInterceptorManager(),
      response: createInterceptorManager(),
    },
    isHttpException,
    toURL: (config) => toURL(client, config),
    withRequest: (init, config) => withRequest(client, init, config),
  };

  return client;
};
