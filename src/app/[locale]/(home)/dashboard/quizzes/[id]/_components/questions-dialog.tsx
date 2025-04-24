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
import QuestionsForm from "./questions-form";
import useGetQuestions from "../_hooks/use-get-questions";

const QuestionsDialog = ({ id, time }: { id: string; time: number }) => {
  // handle questions steps
  const [startExam, setStartExam] = useState<boolean>(false);

  // Hooks
  const { isPending, isError, error, questions, refetch } = useGetQuestions(id);

  // variables
  const instructions: string[] = [
    "Please read all questions carefully and make sure you understand the facts before you begin answering",
    "You will be given specific time  to complete the examination",
    "If time is up before you finish, exam will be automatically submitted",
    "Good luck and have fun!",
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"main"} size={"sm"} className="mt-1">
          Start
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            className={`mb-2  text-dark-900 ${startExam ? "hidden" : "block"}`}
          >
            Instructions
          </DialogTitle>

          <DialogDescription className="sr-only">
            questions will be displayed one by one.
          </DialogDescription>
          <div
            className={` h-full flex justify-between items-start flex-col ${
              startExam ? "hidden" : "block"
            }`}
          >
            <ul className="list-disc list-outside space-y-4 p-5">
              {instructions.map((element: string, index: number) => (
                <li key={index}>{element}</li>
              ))}
            </ul>
            <Button
              variant={"main"}
              onClick={() => {
                refetch().then(() => {
                  setStartExam(true);
                });
              }}
              className=" w-full rounded-3xl "
            >
              Start
            </Button>
          </div>
          <div className={startExam ? "block" : "hidden"}>
            {questions && (
              <QuestionsForm questions={questions.questions} time={time} />
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionsDialog;
