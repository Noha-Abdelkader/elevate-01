import React, { Suspense } from "react";
import ExamList from "./_components/exam-list";
import FormError from "@/components/common/form-error";
import Placeholder from "../../../_components/placeholder";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <section>
      {params.id ? (
        <Suspense fallback={<Placeholder />}>
          <ExamList id={params.id} />
        </Suspense>
      ) : (
        <div className="card-wrapper min-h-[300px] flex items-center justify-center">
          <FormError>No Quiz Found</FormError>
        </div>
      )}
    </section>
  );
};

export default Page;
