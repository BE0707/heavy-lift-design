import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground font-semibold hover:bg-machinery-amber shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-card hover:bg-secondary hover:text-foreground hover:border-steel-border",
        secondary: "bg-secondary text-secondary-foreground hover:bg-muted border border-border",
        ghost: "hover:bg-secondary hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        machinery: "bg-machinery-yellow text-asphalt-950 font-display font-bold tracking-wider uppercase hover:bg-machinery-amber shadow-yellow",
        tactical: "bg-asphalt-850 border border-steel-border text-foreground font-medium hover:border-machinery-yellow hover:text-machinery-yellow",
        hero: "bg-machinery-yellow text-asphalt-950 font-display font-extrabold tracking-wider uppercase hover:bg-machinery-amber shadow-yellow border border-machinery-yellow",
        heroOutline: "border border-steel-border bg-asphalt-900/90 text-foreground font-display font-bold tracking-wider uppercase hover:border-machinery-yellow hover:text-machinery-yellow hover:bg-asphalt-800",
        nav: "text-steel-light hover:text-machinery-yellow font-medium transition-colors duration-200 bg-transparent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
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
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
