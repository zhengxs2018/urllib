import { buildURL } from "../common/buildURL.ts";
import type { HttpRequestOptions } from "../types/request.ts";

export const resolveRequest = (
  init: RequestInfo | URL | undefined,
  options: HttpRequestOptions,
): Request => {
  if (init instanceof Request) {
    return new Request(init, {
      signal: options.signal,
    });
  }

  const requestURL = init instanceof URL
    ? init
    : buildURL(options.baseURL, init || options.url, options.params);

  const request = new Request(requestURL, {
    method: options.method,
    headers: options.headers,
    redirect: options.redirect,
    signal: options.signal,
  });

  if (request.headers.has("Host") === false) {
    request.headers.set("Host", requestURL.host);
  }

  if (request.headers.has("Origin") === false) {
    request.headers.set("Origin", requestURL.origin);
  }

  return request;
};
