import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import type { NextRequest } from "next/server"
import { securityService } from "@/lib/security-service"

// Allow streaming responses for up to 30 seconds
export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const { messages, apiKey: clientApiKey, userId } = await req.json()

    // Try to get the API key from different sources
    const apiKey = process.env.NEXT_PUBLIC_AI_API_KEY || clientApiKey

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error:
            "API key is not configured. Please add your API key to the environment variables or configure it in the setup page.",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      )
    }

    // Check for PHI in messages and sanitize if necessary
    const sanitizedMessages = messages.map((message: any) => {
      if (message.role === "user" && securityService.containsPHI(message.content)) {
        // Log potential PHI exposure attempt
        if (userId) {
          securityService.logSecurityEvent("phi_detection", userId, { messageId: message.id }, true)
        }

        // Sanitize the message
        return {
          ...message,
          content: securityService.sanitizePHI(message.content),
        }
      }
      return message
    })

    // Create audit trail for this chat interaction
    if (userId) {
      await securityService.createAuditTrail(userId, "chat_interaction", "ChatMessage", `chat-${Date.now()}`, {
        messageCount: messages.length,
      })
    }

    const result = streamText({
      model: openai("gpt-4o", { apiKey }),
      system: `You are AGENT 2.0, an advanced AI assistant specialized in genomic data analysis and oncology research.
      
      Your primary functions:
      - Analyze genomic data and provide insights for cancer research
      - Explain complex genomic concepts in clear, accessible language
      - Provide information about cancer treatments, biomarkers, and research
      - Maintain HIPAA compliance and data security at all times
      
      When responding:
      - Be precise and scientifically accurate
      - Use medical terminology appropriately
      - Format responses with markdown for readability
      - Highlight important terms, percentages, and findings
      - Cite sources when providing research information
      - Maintain a professional, helpful tone
      
      HIPAA COMPLIANCE REQUIREMENTS:
      - Never ask for or encourage sharing of Protected Health Information (PHI)
      - If you detect potential PHI in user messages, remind them about data privacy
      - Do not store or repeat any patient identifiers
      - Maintain strict confidentiality in all interactions`,
      messages: sanitizedMessages,
      maxTokens: 2000,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process request. Please check your API key or try again later.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}

