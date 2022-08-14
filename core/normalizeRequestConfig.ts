import type { HttpClient } from "../types/client.ts";
import type {
  HttpRequestConfig,
  HttpRequestOptions,
} from "../types/request.ts";

import { resolveRequestOptions } from "./resolveRequestOptions.ts";

export const normalizeRequestConfig = (
  client: HttpClient,
  init: RequestInfo | URL | HttpRequestConfig,
  config?: HttpRequestConfig,
): [RequestInfo | URL | undefined, HttpRequestOptions] => {
  if (
    typeof init === "string" || init instanceof URL || init instanceof Request
  ) {
    return [init, resolveRequestOptions(client.options, config || {})];
  }

  return [undefined, resolveRequestOptions(client.options, init)];
};
