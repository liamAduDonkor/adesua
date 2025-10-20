import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#00A651] to-[#0066CC] text-white shadow-lg hover:shadow-xl hover:from-[#008A42] hover:to-[#0052A3] transform hover:-translate-y-0.5 active:translate-y-0",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-red-500/20",
        outline:
          "border-2 border-[#00A651] bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-sm text-[#00A651] hover:bg-[#00A651] hover:text-white dark:text-[#EDEDEC] dark:border-[#00A651] dark:hover:bg-[#00A651] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-gradient-to-r from-[#F8F9FA] to-[#E8F4FD] dark:from-[#2a2a2a] dark:to-[#1a1a1a] text-[#1a1a1a] dark:text-[#EDEDEC] shadow-md hover:shadow-lg hover:from-[#F0F4F8] hover:to-[#E0F0FF] dark:hover:from-[#3a3a3a] dark:hover:to-[#2a2a2a] transform hover:-translate-y-0.5 active:translate-y-0",
        ghost: 
          "hover:bg-[#00A651]/10 dark:hover:bg-[#00A651]/20 hover:text-[#00A651] dark:hover:text-[#00A651] transition-colors",
        link: 
          "text-[#00A651] underline-offset-4 hover:underline hover:text-[#008A42] dark:text-[#00A651] dark:hover:text-[#00A651]",
      },
      size: {
        default: "h-10 px-6 py-2 has-[>svg]:px-4",
        sm: "h-8 rounded-lg px-4 has-[>svg]:px-3 text-xs",
        lg: "h-12 rounded-xl px-8 has-[>svg]:px-6 text-base",
        icon: "size-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
