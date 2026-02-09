import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "btn inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "btn-primary",
        destructive: "btn-danger bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "btn-outline border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "btn-accent",
        ghost: "btn-ghost hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "btn-accent",
        soft: "btn-soft",
        dark: "btn-dark",
      },
      size: {
        default: "",
        sm: "btn-compact h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "btn-icon h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const content = asChild ? children : (
      <>
        {loading && <span className="btn-spinner mr-2" aria-hidden="true" />}
        <span className="btn-label">{children}</span>
      </>
    )

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), loading && "btn-loading")}
        ref={ref}
        disabled={props.disabled || loading}
        {...props}
      >
        {content}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
