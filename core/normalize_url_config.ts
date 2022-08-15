import { HttpRequestConfig } from "../types/mod.ts";

/**
 * @internal
 */
export const normalizeUrlConfig = (
  urlOrConfig?: HttpRequestConfig | URL | string,
): HttpRequestConfig => {
  if (typeof urlOrConfig === "string" || urlOrConfig instanceof URL) {
    return { url: urlOrConfig };
  }

  return urlOrConfig || {};
};
