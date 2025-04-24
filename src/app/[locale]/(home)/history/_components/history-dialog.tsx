"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FaRegCheckSquare } from "react-icons/fa";

type Props = {
  answerDetails: UserHistory;
};
const HistoryDialog = ({ answerDetails }: Props) => {

  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={()=>setOpen(!open)}>
      <DialogTrigger asChild>
        <Button variant={"main"} size={"sm"}>
          Answers
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="sr-only">
          <DialogTitle>view right answer</DialogTitle>
          <DialogDescription>help you to improve your score</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 *:space-y-4 py-4 border border-dark-400 rounded-lg p-2 bg-dark-50">
          <h3 className="font-semibold">
            {answerDetails.history.QID.question}
          </h3>
          <ul>
            {answerDetails.history.QID.answers.map((item, index) => (
              <li
                key={index}
                className={`
                  flex items-center gap-2 p-3 rounded-lg border-2 border-dark-400  
                  ${
                    answerDetails.history.QID.correct == item.key &&
                    "border-green-200 bg-green-100 "
                  }
                  ${
                    answerDetails.history.chosenAnswer !==
                      answerDetails.history.QID.correct &&
                    answerDetails.history.chosenAnswer == item.key &&
                    "border-red-200 bg-red-100 "
                  }
                `}
              >
                <FaRegCheckSquare
                  className={`
                    text-sm
                    ${
                      answerDetails.history.QID.correct == item.key &&
                      "text-green-500 "
                    }
                  ${
                    answerDetails.history.chosenAnswer !==
                      answerDetails.history.QID.correct &&
                    answerDetails.history.chosenAnswer == item.key &&
                    "text-red-500  "
                  }
                  `}
                />
                {item.answer}
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          <Button type="button" variant={"main"} className="w-[20vw]"
          onClick={()=>setOpen(false)}
          >Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryDialog;
