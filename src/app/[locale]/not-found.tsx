import { Link } from "@/i18n/navigation";
import React from "react";

import Notfound from "/assets/images/notfound.webp";
import Image from "next/image";

const NotFound = async () => {
  // no html & body tag as layout for local handle it

  return (
    <div className="flex flex-col items-center  min-h-screen text-2xl bg-main-50 space-y-4  ">
      <Image src={Notfound} alt="notfound" sizes={"50vw"} />
      <p className="text-main-100 font-semibold capitalize text-4xl">
        page not found
      </p>

      <Link href="/">
        <span className="text-white bg-main-100 rounded-md px-7 py-3 text-base">
          Back to home
        </span>
      </Link>
    </div>
  );
};

export default NotFound;
