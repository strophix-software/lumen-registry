import * as React from "react"
import { cn } from "@/lib/utils"

export interface AuthSplitProps {
  brand?: {
    name: string
    logo?: React.ReactNode
    href?: string
  }
  testimonial?: {
    quote: string
    author: string
    role?: string
  }
  topAction?: {
    text: string
    linkText: string
    href: string
  }
  children: React.ReactNode
}

export function AuthSplit({
  brand = { name: "Lumen" },
  testimonial = {
    quote: "This architecture transformed our delivery velocity. Building production-grade products has never been this seamless.",
    author: "Sofia Chen",
    role: "VP of Engineering at Acme",
  },
  topAction = {
    text: "Don't have an account?",
    linkText: "Sign up",
    href: "#signup",
  },
  children,
}: AuthSplitProps) {
  return (
    <div className="relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-background text-foreground">
      {/* Brand & Testimonial Hero Column */}
      <div className="relative hidden h-full flex-col justify-between bg-zinc-950 p-10 text-white lg:flex dark:border-r border-border">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]" />
        
        <div className="relative z-20 flex items-center gap-2 text-lg font-bold">
          {brand.logo ?? (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-zinc-950 font-black text-base">
              L
            </div>
          )}
          <span>{brand.name}</span>
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg leading-relaxed text-zinc-300">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <footer className="text-sm">
              <span className="font-semibold text-white">{testimonial.author}</span>
              {testimonial.role && (
                <span className="text-zinc-400"> &mdash; {testimonial.role}</span>
              )}
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Auth Form Column */}
      <div className="flex min-h-screen flex-col justify-between p-6 sm:p-12 lg:p-16">
        {topAction && (
          <div className="flex justify-end text-sm text-muted-foreground">
            <span>{topAction.text} </span>
            <a
              href={topAction.href}
              className="ml-1 font-semibold text-foreground underline underline-offset-4 hover:opacity-80"
            >
              {topAction.linkText}
            </a>
          </div>
        )}

        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>

        <p className="px-8 text-center text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a href="#terms" className="underline underline-offset-4 hover:text-foreground">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#privacy" className="underline underline-offset-4 hover:text-foreground">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}
