import type { HttpClient } from "../types/client.ts";
import type { HttpRequestOptions } from "../types/request.ts";

import { resolveRequest } from "./resolveRequest.ts";

export const createRequest = (
  client: HttpClient,
  init: RequestInfo | URL | undefined,
  options: HttpRequestOptions,
): Promise<Request> =>
  client.interceptors.request.apply(resolveRequest(init, options));
