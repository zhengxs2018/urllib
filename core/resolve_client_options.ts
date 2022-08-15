import { defaultTransformResponse } from "../common/mod.ts";
import type { HttpClientConfig, HttpClientOptions } from "../types/mod.ts";

/**
 * @internal
 */
export const resolveClientOptions = ({
  baseURL,
  method = "GET",
  headers,
  redirect = "follow",
  responseType = "none",
  validateStatus = (status: number) => status >= 200 && status < 300,
  transformResponse = [defaultTransformResponse, undefined],
}: HttpClientConfig): HttpClientOptions => ({
  method,
  baseURL,
  headers: new Headers(headers),
  redirect,
  responseType,
  validateStatus,
  transformResponse,
});
