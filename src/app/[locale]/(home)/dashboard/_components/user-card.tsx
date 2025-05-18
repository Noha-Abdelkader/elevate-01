import getUserHistory from "@/lib/api/user-history.api";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Session } from "@/lib/utils/auth-info";

// icons
import { IoTimeSharp, IoCheckmarkCircle } from "react-icons/io5";
import { AiFillFlag } from "react-icons/ai";

// image
import User from "/assets/images/user.png";
import Image from "next/image";

// types
type userTrakType = { icon: unknown; time: string; header: string };

const UserCard = async () => {
  // get session
  const session = await Session();

  // data
  const userTrack: userTrakType[] = [
    { icon: <AiFillFlag />, time: "278", header: "quiz passed" },
    { icon: <IoTimeSharp />, time: "13 min", header: "Fastest Time" },
    { icon: <IoCheckmarkCircle />, time: "200", header: "Correct Answers" },
  ];

  // get user history
  const payload = await getUserHistory();
  if (!payload) return null;
  const { userData } = payload;
  return (
    <div className="card-wrapper grid grid-cols-10">
      {/* image */}
      <div className=" col-span-2 px-3">
        <Image
          src={User}
          alt="user"
          width={100}
          height={0}
          className="max-h-36 w-full bg-custom-main-50 rounded-md "
        />
      </div>

      <div className="col-span-8 pe-5 xl:pe-0  xl:max-w-xl space-y-2 ">
        {session && (
          <h2 className="text-custom-main-100 text-lg font-semibold capitalize flex items-center ">
            {session.firstName} {session.lastName}
          </h2>
        )}
        {session && (
          <span className="text-dark-200 text-xs">{session.username}</span>
        )}
        <Progress value={30} />
        <ul className="grid grid-cols-3  md:grid-cols-10 gap-2 !mt-5 ">
          {userTrack.map((element, index) => {
            return (
              <li
                key={element.header}
                className={`flex items-center gap-2 ${
                  index == 2 ? "col-span-4" : "col-span-3"
                } `}
              >
                <div className="p-2 flex items-center justify-center shadow_dark bg-white text-custom-main-100 rounded-lg text-xl size-9">
                  {element.icon as React.ReactNode}
                </div>
                <div className=" text-border">
                  <h5 className="font-semibold">
                    {index == 1
                      ? Number(userData?.history.avgAnswerTime)?.toFixed(2) +
                        " min"
                      : element.time}
                  </h5>
                  <h4 className="text-xs font-light">{element.header}</h4>
                </div>
              </li>
            );
          })}
          </ul>
      </div>
    </div>
  );
};

export default UserCard;
