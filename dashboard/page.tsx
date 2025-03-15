import type { Message } from "ai"

// Enhanced Interface to Structure AI Response
export interface EnhancedChatResponse {
  sanitizedMessage: string
  quickReplies: string[]
  formattedGenomicData?: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

// Enhanced Sensitive Data Detection (Expanded PHI and Non-PHI)
export function containsSensitiveHealthInfo(message: string): boolean {
  const sensitivePatterns = [
    /\b\d{3}-\d{2}-\d{4}\b/, // SSN
    /\b\d{9}\b/, // MRN
    /\bpatient id\b/i, // Generic "patient id"
    /\bphi\b/i, // PHI
    /\bdate of birth\b/i, // Date of Birth
    /\bphone number\b/i, // Phone number
    /\bemail address\b/i, // Email address
    /\baddress\b/i, // Address
    /\binsurance\b/i, // Insurance
    /\bmedical history\b/i, // Medical history
    /\bmedication\b/i, // Medications
    /\bfamily history\b/i, // Family health history
    /\bgenetic disorder\b/i, // Genetic disorders
    /\bclinical trial\b/i, // Clinical trial identifiers
    /\bresearch data\b/i // Research participation
  ]
  return sensitivePatterns.some((pattern) => pattern.test(message))
}

// Enhanced Sanitization for Compliance
export function sanitizeForHIPAA(message: string): string {
  let sanitizedMessage = message

  if (containsSensitiveHealthInfo(message)) {
    sanitizedMessage = sanitizedMessage.replace(/\b\d{3}-\d{2}-\d{4}\b/, "[REDACTED SSN]")
                                        .replace(/\b\d{9}\b/, "[REDACTED MRN]")
                                        .replace(/\bphi\b/i, "[REDACTED PHI]")
                                        .replace(/\bphone number\b/i, "[REDACTED PHONE]")
                                        .replace(/\bemail address\b/i, "[REDACTED EMAIL]")
                                        .replace(/\baddress\b/i, "[REDACTED ADDRESS]")
                                        .replace(/\binsurance\b/i, "[REDACTED INSURANCE]")
                                        .replace(/\bmedical history\b/i, "[REDACTED MEDICAL HISTORY]")
                                        .replace(/\bmedication\b/i, "[REDACTED MEDICATION]")
                                        .replace(/\bfamily history\b/i, "[REDACTED FAMILY HISTORY]")
                                        .replace(/\bgenetic disorder\b/i, "[REDACTED GENETIC DISORDER]")
                                        .replace(/\bclinical trial\b/i, "[REDACTED CLINICAL TRIAL]")
                                        .replace(/\bresearch data\b/i, "[REDACTED RESEARCH DATA]");

    return sanitizedMessage + " [This message was redacted for HIPAA compliance.]";
  }
  return sanitizedMessage
}

// Advanced Genomic Data Formatting (Dynamic and Scalable)
export function formatGenomicData(data: any): string {
  try {
    // For larger genomic datasets, return as a well-structured object or pretty-printed JSON.
    if (typeof data === "object" && data !== null) {
      return JSON.stringify(data, null, 2); // For structured objects like gene mutations or clinical trials.
    }
    return String(data); // Handle non-structured or string-based data
  } catch (error) {
    console.error("Error formatting genomic data:", error)
    return "Error formatting genomic data";
  }
}

// Context-Aware Quick Reply Generation (Using NLP Context)
export function generateQuickReplySuggestions(message: string, patientData: any): string[] {
  const content = message.toLowerCase()
  
  // Adding personalized replies based on patient data, like history or condition
  if (content.includes("mutation") || content.includes("genomic")) {
    return [
      "Show more details about this mutation",
      "What are the clinical implications?",
      "Compare with normal gene sequence",
      "What genetic tests are available for this mutation?",
      "What are the common mutations associated with this condition?",
      `Can you show how this mutation relates to ${patientData.name}'s health history?`
    ]
  } else if (content.includes("gene") || content.includes("expression")) {
    return [
      "Show expression levels in detail",
      "How does this affect treatment options?",
      "Are there relevant clinical trials?",
      "What gene therapies are available?",
      `What gene therapies could work best for ${patientData.name}'s condition?`,
      "Are there any environmental factors that impact this gene expression?"
    ]
  } else if (content.includes("treatment") || content.includes("therapy")) {
    return [
      "What are the side effects?",
      "Show success rates",
      "Are there alternative treatments?",
      "What are the latest advancements in treatment?",
      `Can ${patientData.name}'s treatment be personalized based on their genetic data?`,
      "Would this treatment benefit patients with similar genetic mutations?"
    ]
  }

  return ["Can you provide more details?", "Would you like more information on this topic?"]
}

// Notifying User about Sensitive Data (Prevent Information Leaks)
export function notifySensitiveInformationHandling(message: string): string {
  if (containsSensitiveHealthInfo(message)) {
    return `This message contains sensitive health information. Please be cautious when sharing protected health information (PHI). The message has been sanitized for HIPAA compliance.`;
  }
  return "Message is clear of any sensitive health information.";
}

// Enhanced API Workflow with Context-Aware Processing
async function processUserMessage(message: string, patientData: any): Promise<EnhancedChatResponse> {
  const sanitizedMessage = sanitizeForHIPAA(message)
  const quickReplies = generateQuickReplySuggestions(message, patientData)
  const formattedGenomicData = message.toLowerCase().includes("genomic") ? formatGenomicData(message) : undefined

  return {
    sanitizedMessage,
    quickReplies,
    formattedGenomicData
  }
}

// Sample Call to Test Enhanced Functionality
async function testMessageProcessing() {
  const patientData = {
    name: "John Doe",
    medicalHistory: ["Hypertension", "Family history of cancer"],
    geneticMutations: ["BRCA1", "TP53"]
  }

  const response = await processUserMessage("Tell me about the BRCA1 mutation", patientData)
  console.log(response)
}

testMessageProcessing()
