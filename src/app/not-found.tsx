import { useLocale } from "next-intl";
import Link from "next/link";
import React from "react";

import Notfound from "/assets/images/notfound.webp";
import Image from "next/image";

const NotFound = () => {
  const locale = useLocale();

  return (
    <html>
      {/* // as i remove tags from layout to use locale */}
      <body>
        <div className="flex flex-col items-center  min-h-screen text-2xl bg-main-50 space-y-4  ">
          <Image src={Notfound} alt="notfound" sizes={"50vw"} />
          <p className="text-main-100 font-semibold capitalize text-4xl">
            page not found
          </p>
          <Link href={`/${locale}/signin`}>
            <span className="text-white bg-main-100 rounded-md px-7 py-3 text-base">
              Back to home
            </span>
          </Link>
        </div>
      </body>
    </html>
  );
};

export default NotFound;
