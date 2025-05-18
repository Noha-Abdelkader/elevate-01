class AuthenticationError extends Error {
  public statusCode?: number;

  constructor(message: string, statusCode?: number, options?: ErrorOptions) {
    super(message, options);
    this.statusCode = statusCode;
  }
}

class AuthorizationError extends Error {
  public statusCode?: number;

  constructor(message: string, statusCode?: number, options?: ErrorOptions) {
    super(message, options);
    this.statusCode = statusCode;
  }
}

class AppError extends Error {
  public statusCode?: number;

  constructor(message: string, statusCode?: number, options?: ErrorOptions) {
    super(message, options);
    this.statusCode = statusCode;
  }
}


//have problim with return
export default async function catchError<T>(
  promiseFunction: Promise<APIResponse<T>>
): Promise<[T, null] | [null, Error]> {

  try {
    const payload = await promiseFunction;
      if (  "code" in payload  ) {
        if (payload.code === 401) 
          {
          return [null, new AuthenticationError(payload.message, payload.code)];
        }

        if (payload.code === 403) {
          return [null, new AuthorizationError(payload.message,payload.code)];
        } else
        return [null, new AppError(payload.message, payload.code)];
      }
      return [payload, null];
  } catch (error) {

    if (error instanceof Error) {
      return [null, new Error(error.message )];
    }
    return [null , error as Error];
  }
}