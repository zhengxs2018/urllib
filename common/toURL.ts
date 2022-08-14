import { resolveRequestOptions } from "../core/resolveRequestOptions.ts";

import type { HttpClient } from "../types/client.ts";
import type { HttpRequestConfig } from "../types/request.ts";

import { mergeSearchParams } from "./mergeSearchParams.ts";

export const toURL = (
  client: HttpClient,
  urlOrConfig: HttpRequestConfig | string = {},
): URL => {
  const config = typeof urlOrConfig === "string"
    ? { url: urlOrConfig }
    : urlOrConfig;

  const options = resolveRequestOptions(client.options, config);

  const result = new URL(options.url, options.baseURL);

  mergeSearchParams(result.searchParams, options.params);

  return result;
};
