"use client";
import Image from "next/image";
import React from "react";
import mountains from "/assets/images/bro.png";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { FaGoogle, FaFacebook, FaTwitter, FaApple } from "react-icons/fa";
import { Link } from "@/i18n/navigation";

export default function AuthUI({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  // Social type & define
  type Social = { icon: unkown; href: string };
  const socialLinks: Social[] = [
    { icon: <FaGoogle />, href: "www.google.com" },
    { icon: <FaTwitter />, href: "www.twitter.com" },
    { icon: <FaFacebook />, href: "www.facebook.com" },
    { icon: <FaApple />, href: "www.apple.com" },
  ];

  return (
    <>
      {/* left */}
      <div className="col-span-1">
        <div className="min-h-screen h-full bg-main-50 hidden sm:flex items-center justify-center text-black rounded-tr-[40px] rounded-br-[40px]  shadow_dark ">
          <div className="  max-w-sm m-auto">
            <h1 className=" text-4xl lg:text-5xl font-semibold">welcome to</h1>
            <h1 className="text-main-700   text-4xl lg:text-5xl font-semibold">
              Elevate
            </h1>
            <p className="my-4 text-sm">
              Quidem autem voluptatibus qui quaerat aspernatur architecto natus
            </p>
            <Image
              src={mountains}
              width={300}
              height={0}
              alt="cover"
              priority={true}
            />
          </div>
        </div>
      </div>
      {/* right */}
      <div className="col-span-1  max-w-sm mx-auto w-full py-20 px-10 md:px-0">
        <header className="text-end flex items-center justify-center gap-7 text-xs">
          <ul>
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
          </ul>
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
                  {social.icon}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
