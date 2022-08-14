import type { HttpClientConfig, HttpClientOptions } from "../types/client.ts";

import { defaultTransformResponse } from "./defaultTransformResponse.ts";

export const resolveHttpClientOptions = ({
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
