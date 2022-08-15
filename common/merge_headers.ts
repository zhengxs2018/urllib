export const mergeHeaders = (
  object: Headers,
  ...sources: Array<HeadersInit | null | undefined>
): Headers => {
  for (const source of sources) {
    if (!source) continue;

    const headers = new Headers(source);

    for (const [key, value] of headers.entries()) {
      object.set(key, value);
    }
  }

  return object;
};
