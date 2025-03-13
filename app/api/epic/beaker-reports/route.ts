import { type NextRequest, NextResponse } from "next/server"
import { epicFHIRService } from "@/lib/epic-fhir-service"
import { securityService } from "@/lib/security-service"

export async function GET(req: NextRequest) {
  try {
    // Check if the user is authenticated with Epic FHIR
    if (!epicFHIRService.isAuthenticated()) {
      return NextResponse.json({ error: "Not authenticated with Epic FHIR" }, { status: 401 })
    }

    // Get the patient ID from the query parameters
    const url = new URL(req.url)
    const patientId = url.searchParams.get("patientId")

    if (!patientId) {
      return NextResponse.json({ error: "Patient ID is required" }, { status: 400 })
    }

    // Log the data access for audit purposes
    const userId = req.cookies.get("userId")?.value
    if (userId) {
      await securityService.createAuditTrail(userId, "data_access", "BeakerReport", patientId, { method: "GET" })
    }

    // Fetch Beaker laboratory reports for the patient
    const reports = await epicFHIRService.getBeakerLaboratoryReports(patientId)

    // Return the reports
    return NextResponse.json({ reports })
  } catch (error) {
    console.error("Error fetching Beaker reports:", error)
    return NextResponse.json({ error: "Failed to fetch Beaker reports" }, { status: 500 })
  }
}

