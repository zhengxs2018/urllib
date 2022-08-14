// deno-lint-ignore-file

import type { HttpException } from "../common/HttpException.ts";

import { HttpInterceptorManager } from "./interceptor.ts";
import type { HttpRequestConfig, HttpRequestOptions } from "./request.ts";
import type { HttpResponse } from "./response.ts";

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

export type HttpClient = {
  /**
   * 配置项
   */
  options: HttpClientOptions;

  /**
   * 拦截器
   */
  interceptors: {
    config: HttpInterceptorManager<HttpRequestOptions>;
    request: HttpInterceptorManager<Request>;
    response: HttpInterceptorManager<HttpResponse<any>>;
  };

  /**
   * 转换为 URL
   *
   * @param config - 请求配置
   * @returns URL 对象
   */
  toURL(config?: HttpRequestConfig | string): URL;

  /**
   * 处理 HTTP 请求
   *
   * @param init - 请求对象或URL或请求配置
   */
  withRequest<T = any, R = HttpResponse<T>>(
    init: RequestInfo | URL | HttpRequestConfig,
    config?: HttpRequestConfig,
  ): Promise<R>;

  /**
   * 是否 HTTP 请求异常
   *
   * @param value - 判断的值
   */
  isHttpException(value: unknown): value is HttpException;
};
