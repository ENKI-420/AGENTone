"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { VariantVisualizer } from "@/components/genomic/variant-visualizer"
import { IconSearch, IconDna, IconFileUpload, IconDownload } from "@tabler/icons-react"
import { useToast } from "@/hooks/use-toast"
import type { GenomicVariant } from "@/lib/genomic-service"

// Sample data for demonstration
const sampleVariants: GenomicVariant[] = [
  {
    gene: "BRCA1",
    chromosome: "17",
    position: 43106453,
    referenceAllele: "G",
    alternateAllele: "A",
    type: "SNV",
    clinicalSignificance: "Pathogenic",
    interpretation: "This variant is associated with increased risk of breast and ovarian cancer.",
  },
  {
    gene: "BRCA2",
    chromosome: "13",
    position: 32936732,
    referenceAllele: "C",
    alternateAllele: "T",
    type: "SNV",
    clinicalSignificance: "Likely pathogenic",
    interpretation: "This variant may be associated with increased risk of breast and ovarian cancer.",
  },
  {
    gene: "TP53",
    chromosome: "17",
    position: 7578406,
    referenceAllele: "C",
    alternateAllele: "T",
    type: "SNV",
    clinicalSignificance: "Pathogenic",
    interpretation: "This variant is associated with Li-Fraumeni syndrome and increased cancer risk.",
  },
  {
    gene: "PTEN",
    chromosome: "10",
    position: 89624230,
    referenceAllele: "A",
    alternateAllele: "G",
    type: "SNV",
    clinicalSignificance: "Uncertain significance",
    interpretation: "The clinical significance of this variant is currently unknown.",
  },
  {
    gene: "MLH1",
    chromosome: "3",
    position: 37090475,
    referenceAllele: "G",
    alternateAllele: "A",
    type: "SNV",
    clinicalSignificance: "Benign",
    interpretation: "This variant is not associated with increased cancer risk.",
  },
  {
    gene: "MSH2",
    chromosome: "2",
    position: 47702181,
    referenceAllele: "C",
    alternateAllele: "T",
    type: "SNV",
    clinicalSignificance: "Likely benign",
    interpretation: "This variant is likely not associated with increased cancer risk.",
  },
  {
    gene: "APC",
    chromosome: "5",
    position: 112175240,
    referenceAllele: "G",
    alternateAllele: "T",
    type: "SNV",
    clinicalSignificance: "Pathogenic",
    interpretation: "This variant is associated with familial adenomatous polyposis.",
  },
  {
    gene: "KRAS",
    chromosome: "12",
    position: 25398284,
    referenceAllele: "C",
    alternateAllele: "A",
    type: "SNV",
    clinicalSignificance: "Pathogenic",
    interpretation: "This variant is associated with resistance to EGFR inhibitors in colorectal cancer.",
  },
  {
    gene: "EGFR",
    chromosome: "7",
    position: 55242464,
    referenceAllele: "G",
    alternateAllele: "T",
    type: "SNV",
    clinicalSignificance: "Pathogenic",
    interpretation: "This variant is associated with response to EGFR inhibitors in lung cancer.",
  },
  {
    gene: "BRAF",
    chromosome: "7",
    position: 140453136,
    referenceAllele: "A",
    alternateAllele: "T",
    type: "SNV",
    clinicalSignificance: "Pathogenic",
    interpretation: "This variant is associated with melanoma and response to BRAF inhibitors.",
  },
  {
    gene: "PIK3CA",
    chromosome: "3",
    position: 178936091,
    referenceAllele: "G",
    alternateAllele: "A",
    type: "SNV",
    clinicalSignificance: "Pathogenic",
    interpretation: "This variant is associated with breast cancer and response to PI3K inhibitors.",
  },
  {
    gene: "NRAS",
    chromosome: "1",
    position: 115258747,
    referenceAllele: "C",
    alternateAllele: "T",
    type: "SNV",
    clinicalSignificance: "Pathogenic",
    interpretation: "This variant is associated with melanoma and resistance to BRAF inhibitors.",
  },
]

export default function GenomicsPage() {
  const [variants, setVariants] = useState<GenomicVariant[]>([])
  const [filteredVariants, setFilteredVariants] = useState<GenomicVariant[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState<GenomicVariant | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would fetch from an API or database
        // For now, we'll use the sample data
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
        setVariants(sampleVariants)
        setFilteredVariants(sampleVariants)
      } catch (error) {
        console.error("Error loading genomic data:", error)
        toast({
          title: "Error",
          description: "Failed to load genomic data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [toast])

  // Filter variants based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredVariants(variants)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = variants.filter(
      (variant) =>
        variant.gene.toLowerCase().includes(query) ||
        variant.chromosome?.toLowerCase().includes(query) ||
        variant.clinicalSignificance?.toLowerCase().includes(query) ||
        variant.type?.toLowerCase().includes(query),
    )
    setFilteredVariants(filtered)
  }, [searchQuery, variants])

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    try {
      // In a real app, this would process the file and extract variants
      // For now, we'll just simulate it
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate processing time

      toast({
        title: "File Uploaded",
        description: `Successfully processed ${file.name}`,
      })

      // For demo purposes, we'll just use our sample data
      // In a real app, this would parse the file and extract variants
      setVariants(sampleVariants)
      setFilteredVariants(sampleVariants)
    } catch (error) {
      console.error("Error processing file:", error)
      toast({
        title: "Error",
        description: "Failed to process genomic file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle variant selection
  const handleVariantSelect = (variant: GenomicVariant) => {
    setSelectedVariant(variant)
    toast({
      title: "Variant Selected",
      description: `Selected ${variant.gene} variant on chromosome ${variant.chromosome || "Unknown"}`,
    })
  }

  // Generate report
  const handleGenerateReport = async () => {
    try {
      toast({
        title: "Generating Report",
        description: "Creating comprehensive genomic report...",
      })

      // In a real app, this would generate a PDF or other report format
      // For now, we'll just simulate it
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate report generation

      // Create a simple text report
      const report = `
# Genomic Analysis Report
Generated: ${new Date().toLocaleString()}

## Summary
Analysis identified ${filteredVariants.length} genomic variants.

## Variant Details
${filteredVariants.map((v) => `- ${v.gene}: ${v.clinicalSignificance || "Unknown"} (${v.chromosome || "Unknown"}:${v.position || "Unknown"})`).join("\n")}

## Clinical Implications
${selectedVariant ? `Selected variant ${selectedVariant.gene} interpretation: ${selectedVariant.interpretation}` : "No specific variant selected for detailed analysis."}
      `

      // Create a download link
      const blob = new Blob([report], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "genomic-report.txt"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Report Generated",
        description: "Genomic analysis report has been downloaded.",
      })
    } catch (error) {
      console.error("Error generating report:", error)
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <IconDna className="mr-2 h-8 w-8 text-primary" />
            Genomic Analysis
          </h1>
          <p className="text-muted-foreground">Visualize and analyze genomic variants</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Controls</CardTitle>
                <CardDescription>Search and filter variants</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search variants..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="pt-2">
                  <p className="text-sm font-medium mb-2">Upload Data</p>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card/50 hover:bg-card/80">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <IconFileUpload className="w-8 h-8 mb-2 text-primary" />
                      <p className="mb-2 text-sm text-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">VCF, CSV, or JSON</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".vcf,.csv,.json"
                      onChange={handleFileUpload}
                      disabled={isLoading}
                    />
                  </label>
                </div>

                <Button
                  className="w-full"
                  onClick={handleGenerateReport}
                  disabled={filteredVariants.length === 0 || isLoading}
                >
                  <IconDownload className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>

                <div className="pt-2">
                  <p className="text-sm font-medium mb-2">Statistics</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-card/50 p-2 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Total Variants</p>
                      <p className="text-lg font-bold">{filteredVariants.length}</p>
                    </div>
                    <div className="bg-card/50 p-2 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground">Pathogenic</p>
                      <p className="text-lg font-bold">
                        {
                          filteredVariants.filter((v) => v.clinicalSignificance?.toLowerCase().includes("pathogenic"))
                            .length
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {selectedVariant && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Selected Variant</CardTitle>
                  <CardDescription>{selectedVariant.gene}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">
                      Chr {selectedVariant.chromosome || "Unknown"}:{selectedVariant.position || "Unknown"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Change</p>
                    <p className="font-medium">
                      {selectedVariant.referenceAllele || "—"} &rarr; {selectedVariant.alternateAllele || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Significance</p>
                    <p className="font-medium">{selectedVariant.clinicalSignificance || "Unknown"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Interpretation</p>
                    <p className="text-sm">{selectedVariant.interpretation || "No interpretation available"}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="md:col-span-3">
            <VariantVisualizer
              variants={filteredVariants}
              isLoading={isLoading}
              onVariantSelect={handleVariantSelect}
              title="Genomic Variant Analysis"
              description="Interactive visualization of genomic variants and their clinical significance"
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

