import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { SchoolGrid } from "@/components/school-grid"
import { ImpactSection } from "@/components/impact-section"
import { VolunteerForm } from "@/components/volunteer-form"
import { Footer } from "@/components/footer"
import { schools } from "@/data/schools"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <SchoolGrid schools={schools} />
      <ImpactSection />
      <VolunteerForm />
      <Footer />
    </main>
  )
}
