import type { ParamsInit } from "../types/common.ts";

import { mergeSearchParams } from "./mergeSearchParams.ts";

export const buildURL = (
  baseURL: string | URL,
  requestURL?: string | URL,
  params?: ParamsInit | null,
): URL => {
  const result = new URL(requestURL || "", baseURL);

  if (params) {
    mergeSearchParams(result.searchParams, params);
  }

  return result;
};
