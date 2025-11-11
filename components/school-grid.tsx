"use client"

import { useState, useMemo } from "react"
import type { School } from "@/data/schools"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Users } from "lucide-react"

interface SchoolGridProps {
  schools: School[]
}

export function SchoolGrid({ schools }: SchoolGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [districtFilter, setDistrictFilter] = useState("All")
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null)

  const districts = useMemo(() => {
    const unique = Array.from(new Set(schools.map((s) => s.district)))
    return unique.sort()
  }, [schools])

  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "All" || school.status === statusFilter
      const matchesDistrict = districtFilter === "All" || school.district === districtFilter
      return matchesSearch && matchesStatus && matchesDistrict
    })
  }, [schools, searchTerm, statusFilter, districtFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-amber-100 text-amber-800"
      case "Planned":
        return "bg-slate-100 text-slate-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section id="schools" className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-foreground mb-8">School Status Overview</h2>

        {/* Status Legend */}
        <div className="mb-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span className="text-muted-foreground">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-muted-foreground">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-400"></div>
            <span className="text-muted-foreground">Planned</span>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by school name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Planned">Planned</SelectItem>
            </SelectContent>
          </Select>
          <Select value={districtFilter} onValueChange={setDistrictFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by District" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Districts</SelectItem>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* School Cards Grid */}
        {filteredSchools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchools.map((school) => (
              <Card
                key={school.id}
                className="p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedSchool(school)}
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{school.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4" />
                      {school.district}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(school.status)}>{school.status}</Badge>
                    <span className="text-xs text-muted-foreground">Updated {school.last_update}</span>
                  </div>

                  {school.crops.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Crops</p>
                      <div className="flex flex-wrap gap-1">
                        {school.crops.map((crop) => (
                          <Badge key={crop} variant="secondary" className="text-xs">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedSchool(school)
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No schools match your filters. Try adjusting your search.</p>
          </div>
        )}

        {/* Detail Sheet */}
        <Sheet open={!!selectedSchool} onOpenChange={() => setSelectedSchool(null)}>
          <SheetContent className="w-full sm:max-w-md">
            {selectedSchool && (
              <>
                <SheetHeader>
                  <SheetTitle>{selectedSchool.name}</SheetTitle>
                  <SheetDescription>{selectedSchool.district}</SheetDescription>
                </SheetHeader>
                <div className="space-y-6 mt-6">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                    <Badge className={getStatusColor(selectedSchool.status)}>{selectedSchool.status}</Badge>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Garden Lead</p>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <p className="text-foreground">{selectedSchool.lead}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Last Updated</p>
                    <p className="text-foreground">{selectedSchool.last_update}</p>
                  </div>

                  {selectedSchool.crops.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Current Crops</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedSchool.crops.map((crop) => (
                          <Badge key={crop} variant="secondary">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Notes</p>
                    <p className="text-sm text-foreground leading-relaxed">{selectedSchool.notes}</p>
                  </div>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </section>
  )
}
