"use client";

import React from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";

import Logo from "/assets/images/logo.png";

import { MdSpaceDashboard } from "react-icons/md";
import { LuTimer } from "react-icons/lu";
import { RiLogoutBoxFill } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";

const AsideNav = () => {
  // Hooks
  const path = usePathname();
  const { data } = useSession();

  //aside nav
  type navItemType = { title: string; href?: string; icon: unknown };

  let navItem: navItemType[] = [
    { title: "Dashboard", href: "/dashboard", icon: <MdSpaceDashboard /> },
    { title: "Quiz History", href: "/history", icon: <LuTimer /> },
    { title: "logout", icon: <RiLogoutBoxFill /> },
  ];

  navItem = navItem.filter((item) => {
    if (data?.user.role == "user") return item;
    else return item.title !== "Quiz History";
  });
  return (
    <aside className="col-span-3  border-2 border-custom-main-50 rounded-2xl h-full p-4 py-6 shadow_dark">
      <Image
        src={Logo}
        alt="logo"
        width={50}
        height={40}
        style={{
          width: "12vw",
          height: "auto",
          filter: "brightness(0%)",
        }}
      />
      <ul className="space-y-6 mt-12 md:mt-9 lg:max-w-[16vw]  ">
        {navItem.map((item: navItemType, index: number) => (
          <li key={item.title}>
            <Link
              onClick={() => {
                if (index == 2) {
                  signOut({
                    callbackUrl: "/en/signin",
                  });
                }
              }}
              href={item.href ?? ""}
              className={`flex items-center justify-center md:justify-start gap-5  py-2 rounded-lg px-2  ${
                path == item.href ? "bg-custom-main-100 text-white" : "text-dark-300"
              }`}
            >
              <span className="text-lg">{item.icon as React.ReactNode}</span>
              <span className=" hidden md:inline-block">{item.title}</span>
            </Link>
          </li>
        ))}      </ul>
    </aside>
  );
};
export default AsideNav;
