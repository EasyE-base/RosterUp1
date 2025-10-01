import * as React from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  gradient?: "blue" | "green" | "purple" | "orange" | "pink"
}

const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ className, gradient = "blue", children, ...props }, ref) => {
    const gradients = {
      blue: "from-blue-600 to-cyan-600",
      green: "from-green-600 to-emerald-600",
      purple: "from-purple-600 to-pink-600",
      orange: "from-orange-600 to-red-600",
      pink: "from-pink-600 to-rose-600",
    }

    return (
      <span
        ref={ref}
        className={cn(
          "bg-gradient-to-r bg-clip-text text-transparent",
          gradients[gradient],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)
GradientText.displayName = "GradientText"

export { GradientText }
