// const err = new Error("Something went wrong");
// console.log(err.name); // "Error"
// console.log(err.message); // "Something went wrong"
// console.log(err.stack); // Stack trace

// class Error {
//   name: string;
//   message: string;
//   stack: string;
// }

// declare type AuthenticationError<T> = {
//   code: 401;
//   message: string;
// } & T;

// declare type AuthorizationError<T> = {
//   code: 403;
//   message: string;
// } & T;

// declare type AppError<T> = {
//   code: number | string;
//   message: string;
// } & T;

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

// export type PromiseResult<T> = [T | null, Error | null];

//have problim with return
export default async function catchError<T>(
  promiseFunction: Promise<APIResponse<T>>
): Promise<[T, null] | [null, Error]> {
// export default async function catchError<T>(
//   promise: Promise<T>
// ): Promise<any>{
  try {
    const payload = await promiseFunction;
    
      if (  "code" in payload  ) {
        // console.log("in code", payload.code);
        if (payload.code === 401) 
          {
            // throw new AuthenticationError(payload.message, payload.code);
          return [null, new AuthenticationError(payload.message, payload.code)];
        }

        if (payload.code === 403) {
          // throw new AuthorizationError(payload.message , payload.code);
          return [null, new AuthorizationError(payload.message,payload.code)];
        } else
        // throw new AppError(payload.message , payload.code);
        return [null, new AppError(payload.message, payload.code)];
      }
      return [payload, null];
      // return payload;
  } catch (error) {

    if (error instanceof Error) {
      // throw new Error (error.message);
      return [null, new Error(error.message )];
    }
    return [null , error as Error];
    // return [null, new Error('some thing wrong')];
    // return  new Error('some thing wrong');
  }
}