import React from "react";
import AuthUI from "./_components/auth-ui";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
  title?: string;
}>) {
  return (
    <main className="grid  sm:grid-cols-2">
      {children}
      {/* <AuthUI children={children} /> */}
    </main>
  );
}
