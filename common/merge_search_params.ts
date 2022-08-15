import type { ParamsInit } from "../types/common.ts";

export const mergeSearchParams = (
  object: URLSearchParams,
  ...sources: Array<ParamsInit | null | undefined>
): Headers => {
  for (const source of sources) {
    if (!source) continue;

    // @ts-ignore 为什么不支持数字？？？
    const searchParams = new URLSearchParams(source);

    for (const [key, value] of searchParams.entries()) {
      if (object.has(key)) {
        object.append(key, value);
      } else {
        object.set(key, value);
      }
    }
  }

  return object;
};
