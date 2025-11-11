export interface School {
  id: string
  name: string
  district: string
  status: "Active" | "In Progress" | "Planned"
  last_update: string
  crops: string[]
  lead: string
  photos: string[]
  notes: string
}

export const schools: School[] = [
  {
    id: "sng-001",
    name: "Kishan Adarsh HSS",
    district: "Ghaziabad",
    status: "Active",
    last_update: "2025-10-15",
    crops: ["Spinach", "Amaranth", "Tomato"],
    lead: "Rama Tyagi",
    photos: [],
    notes: "Garden beds fully established; students maintaining watering roster.",
  },
  {
    id: "sng-002",
    name: "Govt UPS Vijay Nagar",
    district: "Ghaziabad",
    status: "In Progress",
    last_update: "2025-10-08",
    crops: ["Okra", "Coriander"],
    lead: "Anil Kumar",
    photos: [],
    notes: "Compost pit dug; seedlings arriving next week.",
  },
  {
    id: "sng-003",
    name: "ZP School Indirapuram",
    district: "Ghaziabad",
    status: "Planned",
    last_update: "2025-10-02",
    crops: [],
    lead: "PTA Committee",
    photos: [],
    notes: "Awaiting admin approval and tool procurement.",
  },
]
