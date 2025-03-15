import { useEffect, useState, useCallback } from "react";
import { IconFlask, IconLoader, IconRefresh, IconAlertCircle } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sanitizeForHIPAA } from "@/lib/data-sanitization";

// Interface for the component props
interface LaboratoryReportsProps {
  patientId: string;
  isLoading?: boolean;
  title?: string;
  description?: string;
  onDataLoaded?: (data: any) => void;
}

// Sample lab result interface
interface LabResult {
  name: string;
  status: "normal" | "review" | "abnormal";
  value?: string;
  referenceRange?: string;
  date?: string;
}

// Main component - exported as a named export
export function LaboratoryReports({
  patientId,
  isLoading = false,
  title = "Laboratory Reports",
  description = "View detailed laboratory test results",
  onDataLoaded
}: LaboratoryReportsProps) {
  const [data, setData] = useState<string | null>(null);
  const [labResults, setLabResults] = useState<LabResult[]>([]);
  const [loading, setLoading] = useState<boolean>(isLoading);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch laboratory data
  const fetchLabData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      // Simulate API call with the patientId
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Sanitize patient ID for HIPAA compliance
      const sanitizedPatientId = sanitizeForHIPAA(patientId);

      // Sample lab results data
      const sampleResults: LabResult[] = [
        { name: "Complete Blood Count (CBC)", status: "normal", value: "Within range", referenceRange: "Standard", date: new Date().toISOString().split('T')[0] },
        { name: "Comprehensive Metabolic Panel", status: "normal", value: "Within range", referenceRange: "Standard", date: new Date().toISOString().split('T')[0] },
        { name: "Lipid Panel", status: "review", value: "Slightly elevated", referenceRange: "< 200 mg/dL", date: new Date().toISOString().split('T')[0] },
        { name: "Thyroid Function Tests", status: "normal", value: "Within range", referenceRange: "0.4-4.0 mIU/L", date: new Date().toISOString().split('T')[0] },
      ];

      setLabResults(sampleResults);
      setData(`Laboratory data for patient: ${sanitizedPatientId}`);

      // Call the callback if provided
      if (onDataLoaded) {
        onDataLoaded(sampleResults);
      }
    } catch (err) {
      setError("Failed to fetch laboratory data. Please try again.");
      console.error("Error fetching lab data:", err);
    } finally {
      setLoading(false);
    }
  }, [patientId, onDataLoaded]);

  // Fetch data on component mount or when patientId changes
  useEffect(() => {
    fetchLabData();
  }, [patientId, fetchLabData]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconFlask className="w-6 h-6 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Error State */}
        {error && (
          <div className="mt-4 p-3 rounded-md bg-red-50 text-red-600 text-sm flex items-center gap-2">
            <IconAlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="mt-4 p-6 flex flex-col items-center justify-center text-center">
            <IconLoader className="w-8 h-8 animate-spin text-primary mb-2" />
            <span className="text-muted-foreground">Loading laboratory data...</span>
          </div>
        ) : (
          // Displaying dynamic content or success message
          <div className="space-y-4">
            {data && (
              <div className="p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
                {data}
              </div>
            )}

            {/* Laboratory data display */}
            <div className="border rounded-md p-4 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Laboratory Results</h3>
                <span className="text-xs text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString()}
                </span>
              </div>

              {labResults.length > 0 ? (
                <div className="space-y-3">
                  {labResults.map((result, index) => (
                    <div key={index} className="border-b pb-2 last:border-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{result.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          result.status === 'normal'
                            ? 'bg-green-100 text-green-800'
                            : result.status === 'review'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {result.status === 'normal'
                            ? 'Normal'
                            : result.status === 'review'
                              ? 'Review'
                              : 'Abnormal'}
                        </span>
                      </div>
                      {result.value && (
                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div>
                            <span className="text-xs">Value:</span> {result.value}
                          </div>
                          {result.referenceRange && (
                            <div>
                              <span className="text-xs">Reference:</span> {result.referenceRange}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No laboratory results available.</p>
              )}
            </div>
          </div>
        )}

        {/* Button to refresh data */}
        <Button
          onClick={fetchLabData}
          disabled={loading}
          className="mt-6 flex items-center gap-2"
          variant="outline"
        >
          <IconRefresh className="h-4 w-4" />
          Refresh Data
        </Button>
      </CardContent>
    </Card>
  );
}
