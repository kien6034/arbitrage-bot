import { ServerErrorResponse } from "@grpc/grpc-js";

export function ensureError(value: unknown): Error {
  if (value instanceof Error) return value;

  let stringified = "[Unable to stringify the thrown value]";
  try {
    stringified = JSON.stringify(value);
  } catch {}

  const error = new Error(
    `This value was thrown as is, not through an Error: ${stringified}`
  );
  return error;
}

export function Ok<T>(result: T): { success: true; result: T } {
  return { success: true, result };
}

export function Err(error: Error): {
  success: false;
  error: ServerErrorResponse;
} {
  return {
    success: false,
    error: {
      name: error.name,
      message: error.message,
    },
  };
}

type Jsonable =
  | string
  | number
  | boolean
  | null
  | undefined
  | readonly Jsonable[]
  | { readonly [key: string]: Jsonable }
  | { toJSON(): Jsonable };

export type GrpcResult<
  T,
  E extends ServerErrorResponse = ServerErrorResponse
> = { success: true; result: T } | { success: false; error: E };
