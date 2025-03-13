"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import * as iconsReact from "@tabler/icons-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function EpicLoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check for error parameters in the URL
    const urlParams = new URLSearchParams(window.location.search)
    const error = urlParams.get("error")

    if (error) {
      let errorMessage = "Failed to authenticate with Epic"

      switch (error) {
        case "epic_auth_failed":
          errorMessage = "Epic authentication failed. Please try again."
          break
        case "missing_params":
          errorMessage = "Missing required parameters for Epic authentication."
          break
        case "invalid_state":
          errorMessage = "Invalid state parameter. This could be a security issue."
          break
        case "token_exchange_failed":
          errorMessage = "Failed to exchange authorization code for access token."
          break
        case "callback_error":
          errorMessage = "An error occurred during the authentication callback."
          break
      }

      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }, [toast])

  const handleEpicLogin = async () => {
    try {
      setIsLoading(true)

      // Redirect to the Epic FHIR authentication endpoint
      window.location.href = "/api/epic/auth"
    } catch (error) {
      console.error("Error initiating Epic login:", error)
      toast({
        title: "Authentication Error",
        description: "Failed to initiate Epic login. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <iconsReact.IconBrain className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Epic FHIR Integration</CardTitle>
            <CardDescription className="text-center">
              Connect to Epic FHIR to access patient data and Beaker reports
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">What you'll get access to:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li className="text-sm">Patient demographic information</li>
                <li className="text-sm">Beaker laboratory reports</li>
                <li className="text-sm">Genomic test results</li>
                <li className="text-sm">Clinical observations</li>
              </ul>
            </div>

            <Button className="w-full" onClick={handleEpicLogin} disabled={isLoading}>
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="mr-2"
                >
                  <iconsReact.IconBrandPepsi className="h-5 w-5" />
                </motion.div>
              ) : (
                <iconsReact.IconBrandPepsi className="mr-2 h-5 w-5" />
              )}
              {isLoading ? "Connecting to Epic..." : "Connect with Epic FHIR"}
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">
                <iconsReact.IconArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

