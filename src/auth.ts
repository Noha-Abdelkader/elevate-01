import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { JSON_HEADER } from "./lib/constants/api.constants";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
    signOut:"/signin",
    
  },
  providers: [
    Credentials({
      name: "Credintials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        
        const response = await fetch(`${process.env.BASEURL}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { ...JSON_HEADER },
        });

        const payload: APIResponse<User> = await response.json();

        if ("code" in payload) {
          throw new Error(payload.message ?? "failed login");
        }

        return {
          id: payload.user._id,
          token: payload.token,
          user: { ...payload.user },
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // console.log(user , 'call back')
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};
