// import { User } from "next-auth";

declare type LogedUser = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
};


declare type ChangePassword = {
  oldPassword: string;
  password: string;
  rePassword: string;
};

declare type SignInFields = {
  password: string;
  email: string;
};
