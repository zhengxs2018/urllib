import type { HttpRequestConfig } from "./request.ts";

export interface HttpClientConfig extends
  Pick<
    HttpRequestConfig,
    | "headers"
    | "method"
    | "redirect"
    | "responseType"
    | "validateStatus"
    | "transformResponse"
  > {
  baseURL: string;
}

export interface HttpClientOptions
  extends Omit<Required<HttpClientConfig>, "headers"> {
  headers: Headers;
}
