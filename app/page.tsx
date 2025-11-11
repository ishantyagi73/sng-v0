import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { SchoolGrid } from "@/components/school-grid"
import { ImpactSection } from "@/components/impact-section"
import { VolunteerForm } from "@/components/volunteer-form"
import { Footer } from "@/components/footer"

async function getSchools() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/schools/summary`, {
    cache: "no-store", // ensures fresh data on each load
  })

  if (!res.ok) {
    console.error("Failed to fetch schools summary:", res.status)
    return []
  }

  const { data } = await res.json()
  return data
}

export default async function Home() {
  const schools = await getSchools()

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
