import { Leaf, Sprout, Users } from "lucide-react"
import { Card } from "@/components/ui/card"

export function ImpactSection() {
  const impacts = [
    {
      icon: Sprout,
      title: "Nutrition",
      description: "Fresh produce supplements mid-day meals with iron-rich greens and seasonal veggies.",
    },
    {
      icon: Leaf,
      title: "Climate Literacy",
      description: "Gardens are 'living labs' to learn soil, water, biodiversity, and circularity.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Parents, teachers, and students co-maintain plots—stewardship in action.",
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Impact</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {impacts.map((impact) => {
            const Icon = impact.icon
            return (
              <Card key={impact.title} className="p-8 text-center hover:shadow-md transition-shadow">
                <Icon className="w-12 h-12 text-green-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{impact.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{impact.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
