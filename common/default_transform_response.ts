// deno-lint-ignore-file
import { HttpRequestOptions } from "../types/mod.ts";

export const defaultTransformResponse = (
  response: Response,
  config: HttpRequestOptions,
): Promise<any> => {
  switch (config.responseType) {
    case "json":
      return response.json();
    case "arraybuffer":
      return response.arrayBuffer();
    case "blob":
      return response.blob();
    case "text":
      return response.text();
    case "form":
      return response.formData();
    default:
      return Promise.resolve();
  }
};
