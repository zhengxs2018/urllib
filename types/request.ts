// deno-lint-ignore-file no-explicit-any
import type { Method, ParamsInit, ResponseType } from "./common.ts";

export type HttpRequestConfig = {
  url?: URL | string;
  method?: Method;
  baseURL?: string;
  headers?: HeadersInit;
  params?: ParamsInit | null;
  body?: BodyInit | null;
  redirect?: RequestRedirect;
  responseType?: ResponseType;
  validateStatus?: (status: number, response: Response) => boolean;
  transformResponse?: [
    (response: Response, config: HttpRequestOptions) => Promise<any> | any,
    ((error: Error) => never) | undefined,
  ];
  signal?: AbortSignal | null;
};

export interface HttpRequestOptions
  extends Omit<Required<HttpRequestConfig>, "headers"> {
  headers: Headers;
}
