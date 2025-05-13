import  { User } from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    token: LogedUser["token"];
    user: LogedUser["user"];
  }

  interface Session {
    user: User["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface JWT extends User {}
}
