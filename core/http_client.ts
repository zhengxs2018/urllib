// deno-lint-ignore-file
import { mergeSearchParams } from "../common/mod.ts";

import {
  HttpClientConfig,
  HttpClientOptions,
  HttpRequestConfig,
  HttpRequestOptions,
  HttpResponse,
} from "../types/mod.ts";

import { HttpInterceptorManager } from "./http_interceptor_manager.ts";

import { dispatchRequest } from "./dispatch_request.ts";

import { normalizeRequestConfig } from "./normalize_request_config.ts";
import { normalizeUrlConfig } from "./normalize_url_config.ts";

import { resolveClientOptions } from "./resolve_client_options.ts";
import { resolveRequestOptions } from "./resolve_request_options.ts";

export class HttpClient {
  /**
   * 配置
   */
  options: HttpClientOptions;

  /**
   * 拦截器
   */
  interceptors = {
    config: new HttpInterceptorManager<HttpRequestConfig>(),
    request: new HttpInterceptorManager<HttpRequestOptions>(),
    response: new HttpInterceptorManager<HttpResponse<any>>(),
  } as const;

  constructor(config: HttpClientConfig) {
    this.options = resolveClientOptions(config);
  }

  /**
   * 将配置转转为 URL 对象
   *
   * @param urlOrConfig - 请求地址或配置
   * @returns 转换后的 URL 对象
   */
  toURL(urlOrConfig: HttpRequestConfig | string = {}): URL {
    const { baseURL, url, params } = resolveRequestOptions(
      this.options,
      normalizeUrlConfig(urlOrConfig),
    );

    const requestURL = new URL(url, baseURL);

    mergeSearchParams(requestURL.searchParams, params);

    return requestURL;
  }

  /**
   * 发送请求
   *
   * @param init - 支持配置，Request 和 URL
   * @param extra - 可选配置
   * @returns 响应结果
   */
  withRequest<T = any, R = HttpResponse<T>>(
    init: RequestInfo | URL | HttpRequestConfig,
    extra?: HttpRequestConfig,
  ): Promise<R> {
    const [requestInfo, config] = normalizeRequestConfig(init, extra);
    const options = resolveRequestOptions(this.options, config);

    const promise = this.interceptors.config.apply(options);
    return promise.then((config) => dispatchRequest(this, requestInfo, config));
  }
}
