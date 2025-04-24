"use client";

import React, { useEffect, useRef, useState } from "react";
import Timer from "./timer";

import { useForm } from "react-hook-form";
import {
  QuestionsFields,
  QuestionsSchema,
} from "@/lib/schemes/questions.schema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PieCharts from "@/components/common/pie-chart";
import useCheckQuestions from "../_hooks/use-check-questions";
import FormError from "@/components/common/form-error";

const QuestionsForm = ({
  questions,
  time,
}: {
  questions: Question[];
  time: number;
}) => {
  //   handle questions steps
  const [step, setStep] = useState<number>(0);
  const [showQuestions, setShowQuestions] = useState<boolean>(true);
  const [stopTimer, setStopTimer] = useState<boolean>(false);
  const [timeEnd, setTimeEnd] = useState<boolean>(false);

  const [checkResponse, setCheckResponse] =
    useState<CheckQuestionsResponse | null>(null);

  // variable
  const currentQuestion = questions[step];

  // Hooks
  const {
    isPending,
    error,
    isError,
    mutateAsync,
    data: check,
  } = useCheckQuestions();

  // Form
  const formRef = useRef<HTMLButtonElement>(null);

  const form = useForm<QuestionsFields>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      // answers: questions.map((ques) => {
      //   return { questionId: ques._id, correct: "" };
      // }),
      answers: [
        {
          questionId: "",
          correct: "",
        },
      ],
      time: "",
    },
  });

  // handle event  buttons

  function handlePreviousBtn() {
    // handle previous step in case finished question and review
    if (!showQuestions) {
      setShowQuestions(true);

      // // // to handle back btn
      setStep(questions.length - 1);
      return;
    }

    setStep(step - 1);
  }

  function handleNextBtn() {
    // handle next step and check if it is not the last question
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // check if submitted or not
      if (!stopTimer) {
        // click submit button on last question
        formRef.current?.click();
      } else {
        setShowQuestions(false);
      }
    }
  }

  function handleTimerChange(timeChange: Date) {
    // total exam time in mms
    const examTimeMs = time * 60 * 1000;

    // time remain in mms
    const timeRemaninMS = timeChange.getTime();

    // calculate answer time
    const differenceMs = examTimeMs - timeRemaninMS;
    const differenceSeconds = Math.floor(differenceMs / 1000);

    const minutes = String(Math.floor(differenceSeconds / 60)).padStart(2, "0");
    const seconds = String(differenceSeconds % 60).padStart(2, "0");

    // set answer time
    form.setValue("time", `${minutes},${seconds}`);
  }

  function handleTimerEnd() {
    console.log("time ebbd", time);

    if (showQuestions && !timeEnd) {
      console.log("end");
      setTimeEnd(true);
      //  set timer
      form.setValue("time", String(time));
      // submit form
      formRef.current?.click();
    }
  }

  // handdle submit
  function onSubmit(values: QuestionsFields) {
    setStopTimer(true);

    mutateAsync(values, {
      onSuccess: (data) => {
        setCheckResponse(data);
        setShowQuestions(false);
        data?.WrongQuestions.forEach((question) => {
          let questionIndex: number | null = null;

          form.getValues("answers").find((answer, index) => {
            if (answer.questionId === question.QID) {
              questionIndex = index;
              return true;
            } else {
              return false;
            }
          });

          if (questionIndex) {
            form.setError(`answers.${questionIndex}`, {
              message: question.correctAnswer,
            });
          }
        });
      },
    });
  }

  return (
    <section className="flex  flex-col justify-between h-full min-h-[300px] ">
      {/* case show result */}
      <div className={showQuestions ? "hidden" : "block"}>
        <div className="flex items-center justify-center flex-col gap-4 ">
          {/* header */}
          <h4 className="text-dark-700 text-xl font-medium ">Your score</h4>
          {/* result */}

          {timeEnd && (
            <div className="flex flex-col items-center justify-center gap-4">
              <h4 className="text-red-700 text-xl font-medium">Time is up!</h4>
            </div>
          )}

          <div className="flex items-center  mt-auto ">
            {checkResponse && (
              <PieCharts
                correctValue={checkResponse.correct}
                wrongValue={checkResponse.wrong}
                totalValue={
                  parseFloat(checkResponse.total.slice(0, -1)).toFixed(2) + "%"
                }
              />
            )}

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-main-800 flex items-center font-medium gap-7">
                Correct{" "}
                <span className="size-7 flex items-center justify-center rounded-full border border-main-800">
                  {checkResponse?.correct}
                </span>
              </p>
              <p className="text-[#CC1010] flex items-center font-medium gap-7">
                Incorrect{" "}
                <span className="size-7 flex items-center justify-center rounded-full border border-[#CC1010]">
                  {checkResponse?.wrong}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* case questions */}
      <div
        className={
          showQuestions ? "block   min-h-[430px]  max-h-[550px] " : "hidden"
        }
      >
        {/* header */}
        <header className="flex items-center justify-between mb-4">
          <h4 className="text-main-100 text-xs font-medium">
            Questions
            <span>
              {step + 1} of {questions.length}
            </span>
          </h4>
          <Timer
            time={time}
            stopTimer={stopTimer}
            onTimeChange={(timeChange) => {
              handleTimerChange(timeChange);
            }}
            onTimerEnd={() => {
              handleTimerEnd();
            }}
          />
        </header>

        {/* time line  */}
        <ul className="flex items-center gap-4 mb-5">
          {questions &&
            questions.map((question: Question, index: number) => {
              return (
                <li
                  key={index}
                  className={` block size-2 rounded-full duration-500 ease-in-out ${
                    step + 1 <= index ? "bg-gray-300" : "bg-main-100"
                  }`}
                ></li>
              );
            })}
        </ul>
        {/* questions form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              key={currentQuestion._id}
              control={form.control}
              name={`answers.${step}`}
              render={({ field }) => (
                <FormItem className="space-y-4 ">
                  <FormLabel className="text-base">
                    {currentQuestion.question}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      disabled={isPending}
                      defaultValue=""
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue(
                          `answers.${step}.questionId`,
                          currentQuestion._id
                        );
                        form.setValue(`answers.${step}.correct`, value);
                      }}
                      value={
                        form?.getValues("answers")[step]?.correct ??
                        field.value ??
                        ""
                      }
                      className="flex flex-col space-y-1"
                    >
                      {currentQuestion.answers.map((answer: Answer) => {
                        return (
                          <FormItem
                            key={answer.key}
                            className={`flex items-center space-x-3 space-y-0   p-4 rounded-lg w-full
                                    ${
                                      (form?.getValues("answers")[step]
                                        ?.correct ?? field.value) == answer.key
                                        ? "bg-main-100/25"
                                        : "bg-[#EDEFF3]"
                                    }
                                    `}
                          >
                            <FormControl>
                              <RadioGroupItem value={answer.key} />
                            </FormControl>
                            <FormLabel
                              className="font-normal"
                              id={`answers.${step}`}
                            >
                              {answer.answer}
                            </FormLabel>
                          </FormItem>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="bg-red-50 p-2 rounded-lg mb-2 border border-red-700" />
                </FormItem>
              )}
            />

            <button ref={formRef} type="submit" className="hidden">
              Submit
            </button>
          </form>
        </Form>
      </div>

      {/* show Error */}
      {isError && <FormError>{error?.message}</FormError>}

      {/* buttons */}
      <div className="w-full flex items-center justify-between gap-8 mt-auto">
        <Button
          className="w-full rounded-3xl"
          type="button"
          variant="outline"
          onClick={handlePreviousBtn}
          disabled={(() => {
            // if time end in first question
            if (timeEnd && !showQuestions) {
              return false;
            } else {
              if (step < 1) return true;
            }
          })()}
        >
          {!showQuestions ? "Preview" : "Back"}
        </Button>

        {showQuestions && (
          <Button
            className="w-full rounded-3xl"
            type="button"
            variant={"outline"}
            onClick={handleNextBtn}
            isLoading={isPending}
            disabled={(() => {
              // case pending
              if (isPending) return true;
              if (timeEnd) return false;
              if (
                step <= questions.length - 1 &&
                form.getValues(`answers.${step}`)?.correct
              )
                // case didnt answer
                return false;

              // case finish quiz
              if (step == questions.length) return false;
              else return true;
            })()}
          >
            {showQuestions && step < questions.length - 1
              ? "Next"
              : stopTimer
              ? "Show Result"
              : "Submit"}
          </Button>
        )}
      </div>
    </section>
  );
};

export default QuestionsForm;
