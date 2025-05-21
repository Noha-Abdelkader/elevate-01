import { z } from "zod";

// Signup
export const SignupSchema = z
  .object({
    username: z
      .string({ required_error: "username is required" })
      .min(2, { message: "username must be at least 2 characters" })
      .max(10, { message: "username cannot exceed 10 characters" }),
    firstName: z
      .string({ required_error: "first name is required" })
      .min(2, { message: "first name must be at least 2 characters" })
      .max(10, { message: "first name cannot exceed 10 characters" })
      .regex(
        /^[a-zA-Z]+$/,
        "first name cannot contain number or special character"
      ),
    lastName: z
      .string({ required_error: "last name is required" })

      .min(2, { message: "last name must be at least 2 characters" })
      .max(10, { message: "last name cannot exceed 10 characters" })
      .regex(
        /^[a-zA-Z]+$/,
        "last name cannot contain number or special character"
      ),

    email: z
      .string({ required_error: "email  is required" })
      .email({ message: "invalid email, please enter valid mail" }),
    password: z
      .string({ required_error: "password is required" })
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "password must contatin at least one uppercase letter,one special character (=.[#?!@$%^&*-),one number with maxlength 10 characters"
      ),
    rePassword: z.string({ required_error: "re-password is required" }).regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      // "Confirm password must contatin at least one uppercase letter,one special character (=.[#?!@$%^&*-),one number with maxlength 10 characters"

      "confirm password must be match password"
    ),
    phone: z
      .string({ required_error: "phone is required" })
      .max(11, "phone number cannot exceed 11 number"),
  })
  .refine((schema) => schema.password === schema.rePassword, {
    message: "password and confirm password mismatch",
    path: ["re-password"],
  });

export type SignupSchemaFields = z.infer<typeof SignupSchema>;

// Signin
export const SigninSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invaild email, please enter valid mail" }),
  password: z
    .string({ required_error: "password is required" })
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "password must contatin at least one uppercase letter,one special character (=.[#?!@$%^&*-),one number with maxlength 10 characters"
    ),
});

export type SigninSchemaFields = z.infer<typeof SigninSchema>;

// Forget password
export const ForgetPassSchema = z.object({
  email: z
    .string({ required_error: "email  is required" })
    .email({ message: "invalid email, please enter valid mail" }),
});
export type ForgetPassSchemaFields = z.infer<typeof ForgetPassSchema>;

// Change password
export const ChangePassSchema = z
  .object({
    oldPassword: z
      .string({ required_error: "current password is required" })
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "current password must contatin at least one uppercase letter,one special character (=.[#?!@$%^&*-),one number with maxlength 10 characters"
      ),
    password: z
      .string({ required_error: "password is required" })
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "password must contatin at least one uppercase letter,one special character (=.[#?!@$%^&*-),one number with maxlength 10 characters"
      ),
    rePassword: z
      .string({ required_error: "re-password is required" })
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "confirm password must contatin at least one uppercase letter,one special character (=.[#?!@$%^&*-),one number with maxlength 10 characters"
      ),
  })
  .refine((data) => data.password == data.rePassword, {
    message: "confirm password must be match password",
    path: ["confirm"],
  });
export type ChangePassSchemaFields = z.infer<typeof ChangePassSchema>;

// Reset password
export const ResetPassSchema = z.object({
  email: z
    .string({ required_error: "email  is required" })
    .email({ message: "invalid email, please enter valid mail" }),
  newPassword: z
    .string({ required_error: "password is required" })
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "password must contatin at least one uppercase letter,one special character (=.[#?!@$%^&*-),one number with maxlength 10 characters"
    ),
});

export type ResetPassSchemaFields = z.infer<typeof ResetPassSchema>;

// Verify  code
export const VerifyCodeSchema = z.object({
  resetCode: z
    .string({ required_error: "code is required" })
    .min(6, { message: "code must be 6 characters" })
    .max(6, { message: "code must be 6 characters" }),
});
export type VerifyCodeSchemaFields = z.infer<typeof VerifyCodeSchema>;


// Edit profile
export const EditProfileSchema = z.object({
  username: z
    .string({ required_error: "username is required" })
    .min(2, { message: "username must be at least 2 characters" })
    .max(10, { message: "username cannot exceed 10 characters" }),
  firstName: z
    .string({ required_error: "first name is required" })
    .min(2, { message: "first name must be at least 2 characters" })
    .max(10, { message: "first name cannot exceed 10 characters" })
    .regex(
      /^[a-zA-Z]+$/,
      "first name cannot contain number or special character"
    ),
  lastName: z
    .string({ required_error: "last name is required" })

    .min(2, { message: "last name must be at least 2 characters" })
    .max(10, { message: "last name cannot exceed 10 characters" })
    .regex(
      /^[a-zA-Z]+$/,
      "last name cannot contain number or special character"
    ),
      phone: z
      .string({ required_error: "phone is required" })
      .max(11, "phone number cannot exceed 11 number"),
});

export type EditProfileSchemaFields = z.infer<typeof EditProfileSchema>;
