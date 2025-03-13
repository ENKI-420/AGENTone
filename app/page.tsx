"use client"

import { useEffect } from "react"
import { redirect } from "next/navigation"

export default function Home() {
  useEffect(() => {
    // Check if API key is configured
    const apiKey = process.env.NEXT_PUBLIC_AI_API_KEY || localStorage.getItem("AGENT_2_API_KEY")

    if (!apiKey) {
      // Redirect to setup page if no API key is configured
      redirect("/setup")
    } else {
      // Redirect to chat page if API key is configured
      redirect("/chat")
    }
  }, [])

  return null
}

