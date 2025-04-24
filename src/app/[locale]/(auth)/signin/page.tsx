import React from "react";
import SignInForm from "./_components/signin-form";
import AuthUI from "../_components/auth-ui";

export default function Page() {
  return (
    <AuthUI title="Sign in">
      <SignInForm />
    </AuthUI>
  );
}
