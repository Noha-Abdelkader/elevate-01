import * as React from "react";

import { cn } from "@/lib/utils/tailwaind-utils";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// sizes for input field
function setSize(size: string | number) {
  switch (size) {
    case "default": // not accept string !
    case 1:
      return "h-9 px-4 py-5 ";
    case "sm":
    case 2:
      return "h-8 rounded-xl px-3 text-xs";
    case "lg":
    case 3:
      return "h-10  px-8";
    case "2xl":
    case 4:
      return "h-14";
    default:
      return "h-8 rounded-xl px-3 text-xs";
  }
}

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, size, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative w-full">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className={cn(
            "flex h-10 w-full rounded-xl bg-dark-200/10 text-custom-main-700 border-2 border-dark-400  px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-custom-main-900 placeholder:text-dark-200 focus-visible:outline-none  focus-visible:border-custom-main-700 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm shadow_main ",
            className,
            size && setSize(size)
          )}
          ref={ref}
          {...props}
        />

        {/* handle password visibility */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {type === "password" &&
            (showPassword ? (
              <FaRegEyeSlash
                className="text-custom-main-700 cursor-pointer"
                onClick={() => {
                  if (type === "password")
                    return setShowPassword(!showPassword);
                }}
              />
            ) : (
              <FaRegEye
                className="text-custom-main-700 cursor-pointer"
                onClick={() => {
                  if (type === "password")
                    return setShowPassword(!showPassword);
                }}
              />
            ))}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
