"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LaboratoryReports } from "@/components/laboratory/laboratory-reports"
import { IconSearch, IconUser, IconFlask, IconCalendar, IconFilter } from "@tabler/icons-react"
import { useToast } from "@/hooks/use-toast"

export default function LaboratoryPage() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Mock patient data for demonstration
  const mockPatients = [
    { id: "patient-001", name: "John Doe", dob: "1975-05-15", mrn: "MRN12345" },
    { id: "patient-002", name: "Jane Smith", dob: "1982-11-23", mrn: "MRN67890" },
    { id: "patient-003", name: "Robert Johnson", dob: "1968-03-08", mrn: "MRN24680" },
  ]

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handlePatientSelect = (patientId: string) => {
    setIsLoading(true)
    setSelectedPatientId(patientId)

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <IconFlask className="mr-2 h-8 w-8 text-primary" />
            Laboratory Reports
          </h1>
          <p className="text-muted-foreground">View and analyze patient laboratory results</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Patient Search</CardTitle>
                <CardDescription>Find patients by name or MRN</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search patients..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="mt-4 space-y-2">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <Button
                        key={patient.id}
                        variant={selectedPatientId === patient.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handlePatientSelect(patient.id)}
                      >
                        <IconUser className="mr-2 h-4 w-4" />
                        <div className="text-left">
                          <div>{patient.name}</div>
                          <div className="text-xs text-muted-foreground">
                            DOB: {patient.dob} • {patient.mrn}
                          </div>
                        </div>
                      </Button>
                    ))
                  ) : (
                    <p className="text-center text-sm text-muted-foreground py-4">No patients found</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Filters</CardTitle>
                <CardDescription>Filter laboratory reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Date Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <IconCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input type="date" placeholder="From" className="pl-9" />
                    </div>
                    <div className="relative">
                      <IconCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input type="date" placeholder="To" className="pl-9" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Report Type</label>
                  <div className="relative">
                    <IconFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="all">All Reports</option>
                      <option value="beaker">Beaker Reports</option>
                      <option value="chemistry">Chemistry</option>
                      <option value="hematology">Hematology</option>
                      <option value="microbiology">Microbiology</option>
                    </select>
                  </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            {selectedPatientId ? (
              <LaboratoryReports
                patientId={selectedPatientId}
                isLoading={isLoading}
                title="Laboratory Reports"
                description="View detailed laboratory test results including Beaker reports"
              />
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <IconFlask className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Patient Selected</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Select a patient from the list to view their laboratory reports.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

