import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-bold tracking-wide uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-primary shadow-lg hover:bg-primary/90 hover:shadow-xl transform hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground border-destructive shadow-lg hover:bg-destructive/90 hover:shadow-xl transform hover:-translate-y-0.5",
        outline:
          "border-primary bg-transparent text-primary shadow-md hover:bg-primary hover:text-primary-foreground transform hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground border-secondary shadow-md hover:bg-secondary/80 transform hover:-translate-y-0.5",
        ghost:
          "border-transparent hover:bg-accent hover:text-accent-foreground hover:border-accent",
        link: "text-primary underline-offset-4 hover:underline border-transparent",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
