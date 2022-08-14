export type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

export type ResponseType =
  | "arraybuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "form"
  | "none";

export type ParamsInit =
  | string[][]
  | Record<string, string | number>
  | string
  | URLSearchParams;
