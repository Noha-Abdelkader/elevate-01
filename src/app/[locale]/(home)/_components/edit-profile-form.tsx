"use client";

import React  from "react";

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
  EditProfileSchema,
  EditProfileSchemaFields,
} from "@/lib/schemes/auth.schema";

import FormError from "@/components/common/form-error";
import useEditProfile from "../_hooks/use-edit-profile";
import { useSession } from "next-auth/react";

export default  function EditProfileForm() {
  
  // get session
  const session = useSession();

  // hooks
  const { isError, error, isPending, mutate } = useEditProfile();

  // Form
  const form = useForm<EditProfileSchemaFields>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      username: session?.data?.user.username ?? "",
      lastName: session?.data?.user.lastName ?? "",
      firstName: session?.data?.user.firstName ?? "",
      phone: session?.data?.user.phone ?? "",
    },
  });

  //   submit form
  async function onSubmit(values: EditProfileSchemaFields) {
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
                <Input type="text" placeholder="UserName" {...field} />
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
                  placeholder="Enter phone number"
                  {...field}
                  className={form.formState.errors.phone && "border-[#F04438]"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isError && error && <FormError>{error.message}</FormError>}

        <Button
          className="w-full mt-4"
          variant={"main"}
          type="submit"
          disabled={
            !form.formState.isValid && form.formState.isSubmitting
              ? true
              : false
          }
          isLoading={isPending}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
