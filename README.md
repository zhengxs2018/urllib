# urllib

> ⚠️ 注意: 本项目仅供学习，API 并不稳定，请勿用于正式环境

基于 [deno](https://deno.land/) 和 [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 的一个 HTTP 请求库。

## 使用

支持多种请求参数，点击[这里](#完整的请求配置)查看完整的请求配置

```js
import { createHttpClient } from "https://deno.land/x/urllib@v0.0.1/mod.ts";

const client = createHttpClient({
  baseURL: "https://example.com",
});

// 支持字符串
await client.withRequest("/api/users/123", {
  method: "GET",
});

// 支持 URL 对象
const requestURL = new URL("/api/users/123", "https://example.com");

await client.withRequest(requestURL, {
  method: "GET",
});

// 支持请求对象
const request = new Request({
  url: "https://example.com",
  method: "GET",
});

await client.withRequest(request);
```

### 拦截器

参考 [Axios](https://github.com/axios/axios) 实现的拦截器，但分离了 `config` 和 `request`。

```js
client.interceptors.config.use((config) => {
  // 配置拦截器
  return config;
});

client.interceptors.request.use((request) => {
  // 请求拦截器
  return request;
});

client.interceptors.response.use((response) => {
  // 响应拦截器
  return response;
});
```

### 完整的请求配置

```ts
type HttpRequestConfig = {
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
    ((error: Error) => never) | undefined
  ];
  signal?: AbortSignal | null;
};
```

## 链接

- [deno 中文社区](https://deno.js.cn/)

## License

[MIT](./LICENSE)
