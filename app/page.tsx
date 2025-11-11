import { headers } from "next/headers"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { SchoolGrid } from "@/components/school-grid"
import { ImpactSection } from "@/components/impact-section"
import { VolunteerForm } from "@/components/volunteer-form"
import { Footer } from "@/components/footer"

// Resolve an absolute base URL that works in dev and on Vercel
function getBaseUrl() {
  const h = headers()
  const host = h.get("host")
  const proto = h.get("x-forwarded-proto") ?? "http"

  if (host) return `${proto}://${host}`
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return "http://localhost:3000"
}

async function getSchools() {
  const base = getBaseUrl()
  const res = await fetch(`${base}/api/schools/summary`, {
    cache: "no-store",
  })
  if (!res.ok) {
    console.error("Failed to fetch /api/schools/summary:", res.status)
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
