"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

// import mountains from "/assets/images/bro.png";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { FaGoogle, FaFacebook, FaTwitter, FaApple } from "react-icons/fa";
import { FaSchool } from "react-icons/fa6";

import { Link } from "@/i18n/navigation";

export default function AuthUI({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  // Social type & define
  type Social = { icon: unknown; href: string };
  const socialLinks: Social[] = [
    { icon: <FaGoogle />, href: "www.google.com" },
    { icon: <FaTwitter />, href: "www.twitter.com" },
    { icon: <FaFacebook />, href: "www.facebook.com" },
    { icon: <FaApple />, href: "www.apple.com" },
  ];

  // effect
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {/* left */}
      <div className="bg-main-50 col-span-1 shadow_dark">
        <div className="min-h-screen h-full  hidden sm:flex items-center justify-center text-black  rounded-tr-[40px] rounded-br-[40px] bg-white">
          {/* 42% 58% 46% 54% / 53% 42% 58% 47% */}
          <div
            className="  max-w-4xl  p-20  "
            // style={{borderRadius:'30% 70% 70% 30% / 30% 30% 70% 70% '}}
          >
            <h1
              data-aos="fade-right"
              className=" text-4xl lg:text-5xl font-semibold mb-2 first-letter:text-main-700"
            >
              Welcome to
            </h1>
            <h1
              data-aos="fade-left"
              className="text-main-700   text-4xl lg:text-5xl font-semibold ms-20"
            >
              Exam App
            </h1>
            <div data-aos="fade-up">
              <p className="mt-8  flex items-center  gap-4 text-3xl font-semibold ">
                <span className="first-letter:bg-main-100 first-letter:text-white">
                  School Time
                </span>
                <FaSchool className="text-main-700 text-4xl" />
              </p>
              <p className="mb-4 text-sm text-gray-600">
                Online Class & Online Test !!
              </p>
            </div>
            <Image
              src="https://img.freepik.com/free-vector/preparing-test-together-learning-studying-with-friends-effective-revision-revision-timetables-planning-how-revise-exams-concept-pinkish-coral-bluevector-isolated-illustration_335657-1258.jpg"
              width={400}
              height={0}
              alt="cover"
              // priority={true}
              className="h-full w-full "
            />
          </div>
        </div>
      </div>

      {/* right */}
      <div className="col-span-1 bg-main-50 ">
        <div className="max-w-sm mx-auto w-full py-20 px-10 md:px-0">
          <header className="text-end flex items-center justify-center gap-7 text-xs">
            {/* <ul>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <DropdownMenuLabel>English</DropdownMenuLabel>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <DropdownMenuLabel>Arabic</DropdownMenuLabel>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ul> */}
            <Link href={"/signin"} className="text-main-100 font-semibold">
              Sign in
            </Link>
            <Button variant="main" size={"sm"}>
              <Link href={"/signup"}>Register</Link>
            </Button>
          </header>

          <div className="mt-14 mb-8">
            {title && <h2 className="font-semibold">{title}</h2>}

            {children}
          </div>

          {/* footer */}
          <div>
            <p className=" text-dark-200  text-xs text-center mb-4 relative before:content-[''] before:bg-dark-200/30 before:w-1/4 before:h-[0.5px] before:absolute before:left-4 before:top-[50%] before:-translate-y-1/2   after:content-[''] after:bg-dark-200/30 after:w-1/4 after:h-[0.5px] after:absolute after:right-4 after:top-[50%] after:-translate-y-1/2 ">
              Or Continue with
            </p>
            <ul className=" list-none flex items-center justify-center gap-5 my-2">
              {socialLinks.map((social: Social, index: number) => {
                return (
                  <li
                    key={social.href}
                    className={`p-3 border border-dark-200/30 bg-white rounded-lg text-lg shadow_dark ${
                      index == 2 || index == 1
                        ? "text-main-100"
                        : index == 0
                        ? "text-red-700"
                        : "text-black"
                    }`}
                  >
                    <Link href={social.href} >
                    {social.icon as React.ReactNode}
                    </Link>
                  </li>
                );
              })}{" "}
            </ul>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
