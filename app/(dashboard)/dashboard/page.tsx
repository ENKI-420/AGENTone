"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PatientData } from "@/components/patient/patient-data"
import { IconSearch, IconUser, IconUsers, IconFileAnalytics, IconDna } from "@tabler/icons-react"
import { useAuth } from "@/components/auth/auth-provider"
import axios from "axios"

// WebSocket for real-time updates (keep this running for fetching new Beaker data)
const socket = new WebSocket("wss://your-realtime-server.com")

export default function DashboardPage() {
  const [activePatientId, setActivePatientId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useAuth()
  const [patients, setPatients] = useState<any[]>([]) // To hold real patient data
  const [loading, setLoading] = useState(false)

  // Fetch patient data from your backend (ideally via API call)
  const fetchPatientData = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/patients") // Assume an API endpoint that returns real patient data
      setPatients(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching patient data", error)
      setLoading(false)
    }
  }

  // Setup WebSocket listener for real-time updates
  useEffect(() => {
    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data)
      setPatients((prevData) => [newData, ...prevData]) // Add new data to the front of the list
    }

    fetchPatientData() // Fetch patients when component is mounted

    return () => {
      socket.close() // Cleanup the socket connection when component is unmounted
    }
  }, [])

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AGENT 2.0 Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.email}</p>
        </header>

        {/* Patient Search */}
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
                        variant={activePatientId === patient.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActivePatientId(patient.id)}
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
                <CardTitle className="text-lg font-medium">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <IconUsers className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Total Patients</div>
                    <div className="text-2xl font-bold">{patients.length}</div>
                  </div>
                </div>

                {/* Add additional stats like reports and genomic analysis */}
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            {activePatientId ? (
              <PatientData patientId={activePatientId} />
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <IconUser className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Patient Selected</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Select a patient from the list to view their genomic data and clinical information.
                  </p>
                  <Button variant="outline">Add New Patient</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
