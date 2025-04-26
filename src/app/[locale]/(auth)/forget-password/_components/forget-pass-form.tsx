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
  ForgetPassSchema,
  ForgetPassSchemaFields,
} from "@/lib/schemes/auth.schema";
import { useForgetPass } from "../_hooks/use-forget-pass";
import FormError from "@/components/common/form-error";

export default function ForgetPassForm() {
  // Form
  const form = useForm<ForgetPassSchemaFields>({
    resolver: zodResolver(ForgetPassSchema),
    defaultValues: {
      email: "",
    },
  });

  // Hooks
  const { mutate, isError, error, isPending } = useForgetPass();

  function onSubmit(values: ForgetPassSchemaFields) {
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
              <FormLabel className="sr-only">Email</FormLabel>

              <FormControl>
                <Input
                  size={4}
                  placeholder="Enter your email..."
                  {...field}
                  className={form.formState.errors.email && "border-[#F04438]"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-end my-4">
          {/* <Link href={"/signin"} className="text-main-100 font-medium  text-sm">
            Recover Password ?
            
          </Link> */}
        </div>
        {isError && <FormError>{error?.message}</FormError>}
        <Button
          type="submit"
          variant={"main"}
          className="w-full"
          size={"2xl"}
          isLoading={isPending}
        >
          Confirm
        </Button>
      </form>
    </Form>
  );
}
