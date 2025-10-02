import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-indigo-100 to-indigo-50 text-indigo-900 border border-indigo-200",
        secondary:
          "bg-gradient-to-r from-slate-100 to-slate-50 text-slate-900 border border-slate-200",
        success:
          "bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-900 border border-emerald-200",
        warning:
          "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-900 border border-amber-200",
        destructive:
          "bg-gradient-to-r from-red-100 to-red-50 text-red-900 border border-red-200",
        outline: "text-slate-950 border-2 border-slate-300 bg-white",
        solid:
          "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/25",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
