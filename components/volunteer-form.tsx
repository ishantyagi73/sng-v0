"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"

interface VolunteerEntry {
  name: string
  phone: string
  email: string
  city: string
  role: string
  availability: string
  notes: string
}

export function VolunteerForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<VolunteerEntry>({
    name: "",
    phone: "",
    email: "",
    city: "",
    role: "",
    availability: "",
    notes: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.phone.trim() && !formData.email.trim()) {
      newErrors.contact = "Phone or email is required"
    }

    if (!formData.role) {
      newErrors.role = "Please select a role"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Store in local array (in a real app, this would go to a backend)
    const volunteers = JSON.parse(localStorage.getItem("volunteers") || "[]")
    volunteers.push({
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
    })
    localStorage.setItem("volunteers", JSON.stringify(volunteers))

    toast({
      title: "Thank you!",
      description: "We'll reach out within 48 hours.",
    })

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      city: "",
      role: "",
      availability: "",
      notes: "",
    })
    setErrors({})
    setIsSubmitting(false)
  }

  return (
    <section id="volunteer" className="py-12 md:py-16 bg-white">
      <div className="max-w-2xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-foreground mb-2 text-center">Join Our Movement</h2>
        <p className="text-center text-muted-foreground mb-8">
          Help us grow food, build stewards, and regenerate communities.
        </p>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone (IN)
                </label>
                <Input
                  id="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            {errors.contact && <p className="text-sm text-red-500">{errors.contact}</p>}

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                City
              </label>
              <Input
                id="city"
                placeholder="Your city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                Preferred Role <span className="text-red-500">*</span>
              </label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gardener">Gardener</SelectItem>
                  <SelectItem value="Educator">Educator</SelectItem>
                  <SelectItem value="Sponsor">Sponsor</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role}</p>}
            </div>

            {/* Availability */}
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-foreground mb-2">
                Availability
              </label>
              <Select
                value={formData.availability}
                onValueChange={(value) => setFormData({ ...formData, availability: value })}
              >
                <SelectTrigger id="availability">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Weekdays">Weekdays</SelectItem>
                  <SelectItem value="Weekends">Weekends</SelectItem>
                  <SelectItem value="Both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-2">
                Additional Notes
              </label>
              <Textarea
                id="notes"
                placeholder="Tell us more about your interest..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="min-h-24"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full bg-green-700 hover:bg-green-800 text-white">
              {isSubmitting ? "Submitting..." : "Join Us"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  )
}
