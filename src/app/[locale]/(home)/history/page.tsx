import React, { Suspense } from "react";
import UserHistory from "./_components/user-history";
import Placeholder from "../_components/placeholder";

const Page = () => {
  return (
    <section>
      <Suspense fallback={<Placeholder />}>
        <UserHistory />
      </Suspense>
    </section>
  );
};

export default Page;
