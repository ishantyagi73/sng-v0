"use client"

import { Button } from "@/components/ui/button"

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="about" className="py-12 md:py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            Growing Food. Building Stewards. Regenerating Communities.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            A grassroots program turning schoolyards into living classrooms that feed mid-day meals and climate
            literacy.
          </p>

          {/* KPI Chips */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <div className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-foreground shadow-sm">
              60+ schools engaged
            </div>
            <div className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-foreground shadow-sm">
              35 active gardens
            </div>
            <div className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-foreground shadow-sm">
              &gt;30,000 meals improved
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
            <Button
              onClick={() => scrollToSection("volunteer")}
              className="bg-green-700 hover:bg-green-800 text-white px-8"
            >
              Volunteer
            </Button>
            <Button
              variant="outline"
              className="px-8 bg-transparent"
              onClick={() => {
                window.location.href = "#"
              }}
            >
              Adopt a School
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
