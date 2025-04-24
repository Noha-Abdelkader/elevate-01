import React from "react";
import AuthUI from "../_components/auth-ui";
import ResetPassForm from "./_components/reset-pass-form";

export default function Page() {
  return (
    <AuthUI title="Reset your password">
      <ResetPassForm />
    </AuthUI>
  );
}
