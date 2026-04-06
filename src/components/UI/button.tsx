import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95",
  {
    variants: {
      variant: {
        default: 
          "bg-[#1A1147] text-white shadow-lg hover:shadow-xl hover:bg-[#231556] focus-visible:ring-[#1A1147]",
        primary:
          "bg-[#1A1147] text-white shadow-lg hover:shadow-xl hover:bg-[#231556] focus-visible:ring-[#1A1147]",
        secondary:
          "bg-[#1A1147] text-white shadow-lg hover:shadow-xl hover:bg-[#231556] focus-visible:ring-[#1A1147]",
        destructive:
          "bg-red-600 text-white shadow-lg hover:shadow-xl hover:bg-red-700 focus-visible:ring-red-500",
        outline:
          "border-2 dark:border-white/20 light:border-gray-300 bg-transparent dark:text-white light:text-gray-900 hover:bg-white/5 dark:hover:bg-white/10 light:hover:bg-gray-50 light:hover:border-[#1A1147] dark:hover:border-white/40 focus-visible:ring-[#1A1147]",
        ghost:
          "bg-transparent dark:text-white/80 light:text-gray-700 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-gray-100 light:hover:text-[#1A1147] dark:hover:text-white focus-visible:ring-[#1A1147]/50",
        link: 
          "text-[#1A1147] dark:text-[#818CF8] underline-offset-4 hover:underline focus-visible:ring-[#1A1147]",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-lg gap-1.5 px-4 text-sm",
        lg: "h-14 rounded-xl px-8 text-base",
        xl: "h-16 rounded-xl px-10 text-lg",
        icon: "size-11 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };