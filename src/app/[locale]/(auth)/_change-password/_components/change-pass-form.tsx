"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ChangePassSchema,
  ChangePassSchemaFields,
} from "@/lib/schemes/auth.schema";
import { useChangePassword } from "../_hooks/use-change-pass";
import FormError from "@/components/common/form-error";

export default function ChangePassForm() {
  // Form
  const { isError, error, isPending, mutate } = useChangePassword();

  const form = useForm<ChangePassSchemaFields>({
    resolver: zodResolver(ChangePassSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
  });

  function onSubmit(values: ChangePassSchemaFields) {
    mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="*:my-4">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Current password"
                  {...field}
                  className={
                    form.formState.errors.oldPassword && "border-[#F04438]"
                  }
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
              <FormControl>
                <Input
                  type="password"
                  placeholder="New password"
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
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  {...field}
                  className={
                    form.formState.errors.rePassword && "border-[#F04438]"
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isError && <FormError>{error?.message}</FormError>}

        <Button
          variant={"main"}
          type="submit"
          isLoading={isPending}
          className="mb-4 w-full"
        >
          Change Password
        </Button>
      </form>
    </Form>
  );
}
