import React from "react";

const QuizzesPlaceholder = () => {
  return (
    <ul className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <li
          key={index}
          className="col-span-1 relative  w-full min-h-[200px] card-loader "
        >
          <div className="w-full h-full bg-custom-main-50 rounded-md animate-pulse"></div>
        </li>
      ))}
    </ul>
  );
};

export default QuizzesPlaceholder;
