import getUserHistory from "@/lib/api/user-history.api";
import React from "react";

import { PiExamBold } from "react-icons/pi";
import HistoryDialog from "./history-dialog";
import FormError from "@/components/common/form-error";

const UserHistory = async () => {
  const payload = await getUserHistory();

  if (!payload) {
    return (
      <div className="card-wrapper text-xs flex justify-between  px-4 py-8 min-h-[400px]">
        <FormError> No history Found .... </FormError>
      </div>
    );
  }
  const { userData, examData } = payload;

  return (
    <div>
      {examData?.questions.length && (
        <div className="card-wrapper text-xs flex justify-between  px-4 py-8">
          <div className="flex gap-2  ">
            <PiExamBold className="text-custom-main-100 size-16" />
            <div>
              <h3 className="text-base font-medium">
                {examData.questions[0].exam.title}
              </h3>

              <p className="text-dark-300">
                {examData.questions[0].exam.numberOfQuestions}{" "}
                {examData.questions[0].exam.numberOfQuestions < 2
                  ? "Question"
                  : "Questions"}
              </p>
              <p className="text-custom-main-100 mt-2">
                Answers in {Number(userData.history.avgAnswerTime).toFixed(2)}{" "}
                min.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <p>{examData.questions[0].exam.duration} Minutes</p>
            { userData && <HistoryDialog answerDetails={userData} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHistory;
