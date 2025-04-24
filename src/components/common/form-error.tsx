import React from "react";
import { MdErrorOutline } from "react-icons/md";

const FormError = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex items-center gap-2 
    text-red-600 text-xs mb-3 bg-red-50 p-2 rounded-md my-3
    "
    >
      <MdErrorOutline className="text-xl" />
      <p className="text-sm">{children}</p>
    </div>
  );
};

export default FormError;
