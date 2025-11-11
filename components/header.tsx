"use client"

import { Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-green-700" />
          <span className="font-semibold text-lg text-foreground">SNG</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("schools")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Schools
          </button>
          <Button onClick={() => scrollToSection("volunteer")} className="bg-green-700 hover:bg-green-800 text-white">
            Volunteer
          </Button>
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden">
          <Button
            onClick={() => scrollToSection("volunteer")}
            size="sm"
            className="bg-green-700 hover:bg-green-800 text-white"
          >
            Volunteer
          </Button>
        </div>
      </div>
    </header>
  )
}
