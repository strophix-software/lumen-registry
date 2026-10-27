import * as React from "react"
import { Menu, X, ArrowRight, Github, Twitter, Linkedin, CheckCircle2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface MarketingLink {
  title: string
  href: string
}

export interface MarketingFooterGroup {
  title: string
  links: MarketingLink[]
}

export interface MarketingLayoutProps {
  brand?: {
    name: string
    logo?: React.ReactNode
    href?: string
  }
  navigation?: MarketingLink[]
  banner?: {
    text: string
    ctaText?: string
    ctaHref?: string
  }
  footerGroups?: MarketingFooterGroup[]
  children: React.ReactNode
  onNewsletterSubmit?: (email: string) => void
}

const DEFAULT_LINKS: MarketingLink[] = [
  { title: "Features", href: "#features" },
  { title: "Solutions", href: "#solutions" },
  { title: "Pricing", href: "#pricing" },
  { title: "Docs", href: "#docs" },
]

const DEFAULT_FOOTER_GROUPS: MarketingFooterGroup[] = [
  {
    title: "Product",
    links: [
      { title: "Features", href: "#" },
      { title: "Integrations", href: "#" },
      { title: "Changelog", href: "#" },
      { title: "Roadmap", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Documentation", href: "#" },
      { title: "API Reference", href: "#" },
      { title: "Guides", href: "#" },
      { title: "Community", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "#" },
      { title: "Blog", href: "#" },
      { title: "Careers", href: "#" },
      { title: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy", href: "#" },
      { title: "Terms", href: "#" },
      { title: "Security", href: "#" },
    ],
  },
]

export function MarketingLayout({
  brand = { name: "Lumen" },
  navigation = DEFAULT_LINKS,
  banner,
  footerGroups = DEFAULT_FOOTER_GROUPS,
  children,
  onNewsletterSubmit,
}: MarketingLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    onNewsletterSubmit?.(email)
    setSubscribed(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Top announcement banner */}
      {banner && (
        <div className="flex items-center justify-center gap-2 bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">
          <span>{banner.text}</span>
          {banner.ctaText && (
            <a
              href={banner.ctaHref ?? "#"}
              className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 hover:opacity-90"
            >
              {banner.ctaText}
              <ArrowRight className="h-3 w-3" />
            </a>
          )}
        </div>
      )}

      {/* Sticky header navbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <a href={brand.href ?? "/"} className="flex items-center gap-2 font-bold tracking-tight text-lg">
              {brand.logo ?? (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-extrabold text-base">
                  L
                </div>
              )}
              <span>{brand.name}</span>
            </a>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              {navigation.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <a href="#login">Log in</a>
            </Button>
            <Button size="sm" asChild>
              <a href="#get-started">Get Started</a>
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="border-b bg-background px-4 py-6 md:hidden">
            <nav className="flex flex-col gap-4 text-base font-medium">
              {navigation.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.title}
                </a>
              ))}
              <div className="pt-4 border-t flex flex-col gap-2">
                <Button variant="outline" className="w-full" asChild>
                  <a href="#login">Log in</a>
                </Button>
                <Button className="w-full" asChild>
                  <a href="#get-started">Get Started</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main content body */}
      <main className="flex-1">{children}</main>

      {/* Global marketing footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:gap-12">
            <div className="col-span-2 flex flex-col gap-4">
              <a href={brand.href ?? "/"} className="flex items-center gap-2 font-bold tracking-tight text-lg">
                {brand.logo ?? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-extrabold text-sm">
                    L
                  </div>
                )}
                <span>{brand.name}</span>
              </a>
              <p className="text-sm text-muted-foreground max-w-sm">
                Next-generation building blocks and architecture for modern web applications.
              </p>
              <div className="flex items-center gap-3 text-muted-foreground">
                <a href="https://github.com" className="hover:text-foreground">
                  <Github className="h-4 w-4" />
                </a>
                <a href="https://twitter.com" className="hover:text-foreground">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="https://linkedin.com" className="hover:text-foreground">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>

            {footerGroups.map((group, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  {group.title}
                </h4>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {group.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href={link.href} className="transition-colors hover:text-foreground">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
