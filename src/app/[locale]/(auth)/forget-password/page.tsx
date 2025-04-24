import React from "react";
import AuthUI from "../_components/auth-ui";
import ForgetPassForm from "./_components/forget-pass-form";

export default function Page() {
  return (
    <AuthUI title="Forgot Your Password">
      <ForgetPassForm />
    </AuthUI>
  );
}
