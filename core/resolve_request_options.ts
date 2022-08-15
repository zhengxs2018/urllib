import { mergeHeaders } from "../common/mod.ts";
import {
  HttpClientOptions,
  HttpRequestConfig,
  HttpRequestOptions,
} from "../types/mod.ts";

/**
 * @internal
 */
export const resolveRequestOptions = (
  options: HttpClientOptions,
  config: HttpRequestConfig,
): HttpRequestOptions => {
  const {
    url = "",
    params = null,
    body = null,
    signal = null,
    redirect = options.redirect,
    method = options.method,
    baseURL = options.baseURL,
    responseType = options.responseType,
    validateStatus = options.validateStatus,
    transformResponse = options.transformResponse,
  } = config;

  const headers = mergeHeaders(new Headers(), options.headers, config.headers);

  return {
    baseURL,
    url,
    method,
    params,
    headers,
    body,
    redirect,
    responseType,
    validateStatus,
    transformResponse,
    signal,
  };
};
