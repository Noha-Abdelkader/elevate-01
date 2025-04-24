"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CiCirclePlus } from "react-icons/ci";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { QuizSchemaFields, QuizSchema } from "@/lib/schemes/quiz.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const QuizDialog = () => {
  // variable
  const [step, setStep] = useState<number>(1);

  // Form
  const form = useForm<QuizSchemaFields>({
    resolver: zodResolver(QuizSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  function onSubmit(values: QuizSchemaFields) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"main"} size={"lg"}>
          Add diploma
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={`mb-2  text-main-100 `}>
            {step == 1 ? "Add Diploma" : "Add Question"}
          </DialogTitle>

          <DialogDescription className="sr-only">
            adding new quizzes
          </DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={`${
                step != 3 ? "flex items-end justify-between gap-4 " : ""
              } text-dark-200`}
            >
              {/* step 1 */}
              {step == 1 && (
                <>
                  {/* icon */}
                  <CiCirclePlus className="text-4xl" />
                  {/* name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diploma name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter name"
                            {...field}
                            className={
                              form.formState.errors.name && "border-[#F04438]"
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* description */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter name"
                            {...field}
                            className={
                              form.formState.errors.name && "border-[#F04438]"
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* step 2 */}
              {step == 2 && (
                <>
                  {/* icon */}
                  <CiCirclePlus className="text-4xl" />
                  {/* name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter name"
                            {...field}
                            className={
                              form.formState.errors.name && "border-[#F04438]"
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quiz name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter name"
                            {...field}
                            className={
                              form.formState.errors.name && "border-[#F04438]"
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* description */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter name"
                            {...field}
                            className={
                              form.formState.errors.name && "border-[#F04438]"
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {/* step 3 */}
              {step == 3 && (
                <>
                  {/* name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add Question</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter name"
                            {...field}
                            className={
                              form.formState.errors.name && "border-[#F04438]"
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* answer 1 */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add answer 1</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter answer"
                            {...field}
                            className={
                              form.formState.errors.name && "border-[#F04438]"
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* answer 2 */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add answer 2</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter answer"
                            {...field}
                            className={
                              form.formState.errors.name && "border-[#F04438]"
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* answer 3 */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add answer 3</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter answer"
                            {...field}
                            className={
                              form.formState.errors.name && "border-[#F04438]"
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* answer 4 */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Add answer 4</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter answer"
                            {...field}
                            className={
                              form.formState.errors.name && "border-[#F04438]"
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </form>
          </Form>
          <div className="flex items-center justify-between mt-10">
            <Button
              type="submit"
              variant={"outline"}
              className="px-16 py-1"
              disabled={step == 1}
              onClick={() => {
                setStep((prev) => prev - 1);
              }}
            >
              Back
            </Button>
            <Button
              disabled={step == 3}
              type="submit"
              variant={"main"}
              className="px-16 py-1"
              onClick={() => setStep((prev) => prev + 1)}
            >
              {step == 3 ? "Done" : "Add"}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default QuizDialog;
