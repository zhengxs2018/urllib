import type { HttpRequestConfig } from "../types/request.ts";

/**
 * @internal
 */
export const normalizeRequestConfig = (
  init: RequestInfo | URL | HttpRequestConfig,
  config?: HttpRequestConfig,
): [RequestInfo | URL | undefined, HttpRequestConfig] => {
  if (
    typeof init === "string" ||
    init instanceof URL ||
    init instanceof Request
  ) {
    return [init, config || {}];
  }

  return [undefined, init];
};
