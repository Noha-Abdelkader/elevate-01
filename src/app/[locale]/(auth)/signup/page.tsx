import React from "react";
import SignUpForm from "./_components/signup-form";
import AuthUI from "../_components/auth-ui";

export default function Page() {
  return (
    <AuthUI title="Sign up">
      <SignUpForm />
    </AuthUI>
  );
}
