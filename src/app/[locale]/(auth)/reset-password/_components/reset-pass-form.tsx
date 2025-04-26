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
import {
 
  ResetPassSchemaFields,
  ResetPassSchema,
} from "@/lib/schemes/auth.schema";
// import { useForgetPass } from "../_hooks/use-forget-pass";
import FormError from "@/components/common/form-error";
import { useResetPass } from "../_hooks/use-reset-pass";

export default function ResetPassForm() {
  // Form
  const form = useForm<ResetPassSchemaFields>({
    resolver: zodResolver(ResetPassSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  // Hooks
  const { mutate, isError, error, isPending } = useResetPass();

  function onSubmit(values: ResetPassSchemaFields) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">email</FormLabel>

              <FormControl>
                <Input
                  size={4}
                  placeholder="Enter your email ..."
                  {...field}
                  className={form.formState.errors.email && "border-[#F04438]"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">new password</FormLabel>

              <FormControl>
                <Input
                type="password"
                  size={4}
                  placeholder="Enter your new password ..."
                  {...field}
                  className={
                    form.formState.errors.newPassword && "border-[#F04438]"
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isError && <FormError>{error?.message}</FormError>}
        <Button
          type="submit"
          variant={"main"}
          className="w-full mt-5"
          size={"2xl"}
          isLoading={isPending}
        >
          Reset
        </Button>
      </form>
    </Form>
  );
}
