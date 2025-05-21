import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Exam app",
  description: "Elevate exam app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;  //if make {children} will return as object !
}
