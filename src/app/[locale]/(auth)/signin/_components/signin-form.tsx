"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { Link } from "@/i18n/navigation";
import { SigninSchema, SigninSchemaFields } from "@/lib/schemes/auth.schema";
import FormError from "@/components/common/form-error";
import useSignIn from "../_hooks/use-sign-in";

export default  function SignInForm() {


  // Hooks
  const { error, isError, isPending, mutateAsync  , data} = useSignIn();

  // Form
  const form = useForm<SigninSchemaFields>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SigninSchemaFields) {
    mutateAsync(values )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input
                type="text"
                  size={4}
                  placeholder="Enter your Email"
                  {...field}
                  className={form.formState.errors.email && "!border-[#F04438]"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Password</FormLabel>

              <FormControl>
                <Input
                type="password"
                  size={4}
                  placeholder="Enter your password"
                  {...field}
                  className={
                    form.formState.errors.password && "!border-[#F04438]"
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-end my-4">
          <Link
            href={"/forget-password"}
            className="text-main-100 font-medium text-sm"
          >
            Forget Password ?
          </Link>

        </div>
        {isError && <FormError>{error && error?.message}</FormError>}
        <Button
          className="w-full "
          size={"2xl"}
          variant="main"
          type="submit"
          isLoading={isPending}
        >
          Sign in
        </Button>
      </form>
    </Form>
  );
}
