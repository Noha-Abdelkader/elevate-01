import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/tailwaind-utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-base transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow_faint",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 ",
        outline:
          " text-main-100 border border-main-100 bg-white shadow-sm hover:bg-main-100 hover:text-white duration-300 ease-in-out",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: " !shadow-none",
        link: "text-main-100 underline-offset-4 hover:underline",
        main: "  border-[1px] border-transparent text-white bg-main-100 hover:bg-transparent hover:text-main-100 hover:border-main-100 ease-in-out duration-500 shadow_faint",
      },
      size: {
        default: "h-9 px-4 py-5 ",
        sm: "h-8 rounded-xl px-3 text-xs",
        lg: "h-10  px-8",
        "2xl": "h-12",
        icon: "h-9 w-9",
      },
      isLoading: {
        true: "pointer-events-none opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      isLoading: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, isLoading }))}
        ref={ref}
        {...props}
      >
        {props.children}

        {isLoading && <span className={`spinner-loader ${variant == 'outline' && 'border-color : text-main-100' }`}></span>}
        {/* {props.isLoading ? <span className="spinner-loader"></span> : props.children} */}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
