// deno-lint-ignore-file no-explicit-any
import { HttpRequestOptions } from "./request.ts";

export interface HttpResponse<T extends any> {
  config: HttpRequestOptions;
  request: Request;
  response: Response;
  headers: Headers;
  data: T;
  throwError(reason: string | Error, code?: number): never;
}
