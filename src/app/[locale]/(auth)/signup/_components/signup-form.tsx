"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupSchema, SignupSchemaFields } from "@/lib/schemes/auth.schema";

import useSignup from "../_hooks/use-signup";
import FormError from "@/components/common/form-error";
import { Link } from "@/i18n/navigation";

export default function SignUpForm() {
  // Form
  const form = useForm<SignupSchemaFields>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  // hooks
  const { isError, error, isPending, mutate } = useSignup();

  async function onSubmit(values: SignupSchemaFields) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* invalid:border-red-500 */}
        {/* user name */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Username</FormLabel>
              <FormControl>
                <Input type="text" size={4} placeholder="UserName" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* first name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">first name</FormLabel>

              <FormControl>
                <Input
                  type="text"
                  size={4}
                  placeholder="First Name"
                  {...field}
                  className={
                    form.formState.errors.firstName && "border-[#F04438]"
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* last name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">last name</FormLabel>

              <FormControl>
                <Input
                  type="text"
                  size={4}
                  placeholder="Last Name"
                  {...field}
                  className={
                    form.formState.errors.lastName && "border-[#F04438]"
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">email</FormLabel>

              <FormControl>
                <Input
                  type="email"
                  size={4}
                  placeholder="Enter Email"
                  {...field}
                  className={form.formState.errors.email && "border-[#F04438]"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">phone</FormLabel>

              <FormControl>
                <Input
                  maxLength={11}
                  type="tel"
                  size={4}
                  placeholder="Enter phone number"
                  {...field}
                  className={form.formState.errors.phone && "border-[#F04438]"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">password</FormLabel>

              <FormControl>
                <Input
                  type="password"
                  size={4}
                  placeholder="Password"
                  {...field}
                  className={
                    form.formState.errors.password && "border-[#F04438]"
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* respassword */}
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">confirm password</FormLabel>

              <FormControl>
                <Input
                  type="password"
                  size={4}
                  placeholder="Confirm Password"
                  {...field}
                  className={
                    form.formState.errors.password && "border-[#F04438]"
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h6 className="text-center my-4 text-[#313131] text-sm">
          Already have an account?
          <Link href={"/signin"} className="text-main-100 mx-2">
            Login
          </Link>
        </h6>
        {error && <FormError>{error.message}</FormError>}

        <Button
          onClick={() => onSubmit(form.getValues())}
          type="submit"
          className="w-full bg-main-100 border-2 border-transparent hover:bg-transparent hover:text-main-100 hover:border-main-100 "
          disabled={
            !form.formState.isValid && form.formState.isSubmitting
              ? true
              : false
          }
          isLoading={isPending}
        >
          Create Account
        </Button>
      </form>
    </Form>
  );
}
