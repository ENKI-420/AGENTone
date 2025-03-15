/**
 * Data Sanitization Utilities
 * 
 * This module provides functions for sanitizing sensitive health information
 * to ensure HIPAA compliance in the application.
 */

// Enhanced Sensitive Data Detection
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
  if (!message) return message;
  
  let sanitizedMessage = message;

  if (containsSensitiveHealthInfo(message)) {
    sanitizedMessage = sanitizedMessage
      .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[REDACTED SSN]")
      .replace(/\b\d{9}\b/g, "[REDACTED MRN]")
      .replace(/\bpatient id\b/i, "[REDACTED PHI]")
      .replace(/\bphi\b/i, "[REDACTED PHI]")
      .replace(/\bdate of birth\b/i, "[REDACTED DOB]")
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

    return sanitizedMessage;
  }
  return sanitizedMessage;
}

// Advanced Genomic Data Formatting
export function formatGenomicData(data: any): string {
  try {
    // For larger genomic datasets, return as a well-structured object or pretty-printed JSON.
    if (typeof data === "object" && data !== null) {
      return JSON.stringify(data, null, 2); // For structured objects like gene mutations or clinical trials.
    }
    return String(data); // Handle non-structured or string-based data
  } catch (error) {
    console.error("Error formatting genomic data:", error);
    return "Error formatting genomic data";
  }
}

// Context-Aware Quick Reply Generation
export function generateQuickReplySuggestions(message: string, patientData: any): string[] {
  const content = message.toLowerCase();
  
  // Default replies
  const defaultReplies = [
    "Can you provide more details?",
    "What are the next steps?",
    "When was this data collected?"
  ];
  
  // Adding personalized replies based on patient data
  if (content.includes("mutation") || content.includes("genomic")) {
    return [
      "Show more details about this mutation",
      "What are the clinical implications?",
      "Compare with normal gene sequence",
      "What genetic tests are recommended?"
    ];
  }
  
  if (content.includes("lab") || content.includes("test") || content.includes("result")) {
    return [
      "When were these tests performed?",
      "Are there any abnormal results?",
      "What follow-up tests are recommended?",
      "How do these compare to previous results?"
    ];
  }
  
  if (content.includes("treatment") || content.includes("therapy")) {
    return [
      "What are the potential side effects?",
      "What is the success rate?",
      "Are there alternative treatments?",
      "What is the recommended duration?"
    ];
  }
  
  return defaultReplies;
}

// Enhanced Chat Response Interface
export interface EnhancedChatResponse {
  sanitizedMessage: string;
  quickReplies: string[];
  formattedGenomicData?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}/**
 * Data Sanitization Utilities
 * 
 * This module provides functions for sanitizing sensitive health information
 * to ensure HIPAA compliance in the application.
 */

// Enhanced Sensitive Data Detection
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
  if (!message) return message;
  
  let sanitizedMessage = message;

  if (containsSensitiveHealthInfo(message)) {
    sanitizedMessage = sanitizedMessage
      .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[REDACTED SSN]")
      .replace(/\b\d{9}\b/g, "[REDACTED MRN]")
      .replace(/\bpatient id\b/i, "[REDACTED PHI]")
      .replace(/\bphi\b/i, "[REDACTED PHI]")
      .replace(/\bdate of birth\b/i, "[REDACTED DOB]")
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

    return sanitizedMessage;
  }
  return sanitizedMessage;
}

// Advanced Genomic Data Formatting
export function formatGenomicData(data: any): string {
  try {
    // For larger genomic datasets, return as a well-structured object or pretty-printed JSON.
    if (typeof data === "object" && data !== null) {
      return JSON.stringify(data, null, 2); // For structured objects like gene mutations or clinical trials.
    }
    return String(data); // Handle non-structured or string-based data
  } catch (error) {
    console.error("Error formatting genomic data:", error);
    return "Error formatting genomic data";
  }
}

// Context-Aware Quick Reply Generation
export function generateQuickReplySuggestions(message: string, patientData: any): string[] {
  const content = message.toLowerCase();
  
  // Default replies
  const defaultReplies = [
    "Can you provide more details?",
    "What are the next steps?",
    "When was this data collected?"
  ];
  
  // Adding personalized replies based on patient data
  if (content.includes("mutation") || content.includes("genomic")) {
    return [
      "Show more details about this mutation",
      "What are the clinical implications?",
      "Compare with normal gene sequence",
      "What genetic tests are recommended?"
    ];
  }
  
  if (content.includes("lab") || content.includes("test") || content.includes("result")) {
    return [
      "When were these tests performed?",
      "Are there any abnormal results?",
      "What follow-up tests are recommended?",
      "How do these compare to previous results?"
    ];
  }
  
  if (content.includes("treatment") || content.includes("therapy")) {
    return [
      "What are the potential side effects?",
      "What is the success rate?",
      "Are there alternative treatments?",
      "What is the recommended duration?"
    ];
  }
  
  return defaultReplies;
}

// Enhanced Chat Response Interface
export interface EnhancedChatResponse {
  sanitizedMessage: string;
  quickReplies: string[];
  formattedGenomicData?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}/**
 * Data Sanitization Utilities
 * 
 * This module provides functions for sanitizing sensitive health information
 * to ensure HIPAA compliance in the application.
 */

// Enhanced Sensitive Data Detection
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
  if (!message) return message;
  
  let sanitizedMessage = message;

  if (containsSensitiveHealthInfo(message)) {
    sanitizedMessage = sanitizedMessage
      .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[REDACTED SSN]")
      .replace(/\b\d{9}\b/g, "[REDACTED MRN]")
      .replace(/\bpatient id\b/i, "[REDACTED PHI]")
      .replace(/\bphi\b/i, "[REDACTED PHI]")
      .replace(/\bdate of birth\b/i, "[REDACTED DOB]")
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

    return sanitizedMessage;
  }
  return sanitizedMessage;
}

// Advanced Genomic Data Formatting
export function formatGenomicData(data: any): string {
  try {
    // For larger genomic datasets, return as a well-structured object or pretty-printed JSON.
    if (typeof data === "object" && data !== null) {
      return JSON.stringify(data, null, 2); // For structured objects like gene mutations or clinical trials.
    }
    return String(data); // Handle non-structured or string-based data
  } catch (error) {
    console.error("Error formatting genomic data:", error);
    return "Error formatting genomic data";
  }
}

// Context-Aware Quick Reply Generation
export function generateQuickReplySuggestions(message: string, patientData: any): string[] {
  const content = message.toLowerCase();
  
  // Default replies
  const defaultReplies = [
    "Can you provide more details?",
    "What are the next steps?",
    "When was this data collected?"
  ];
  
  // Adding personalized replies based on patient data
  if (content.includes("mutation") || content.includes("genomic")) {
    return [
      "Show more details about this mutation",
      "What are the clinical implications?",
      "Compare with normal gene sequence",
      "What genetic tests are recommended?"
    ];
  }
  
  if (content.includes("lab") || content.includes("test") || content.includes("result")) {
    return [
      "When were these tests performed?",
      "Are there any abnormal results?",
      "What follow-up tests are recommended?",
      "How do these compare to previous results?"
    ];
  }
  
  if (content.includes("treatment") || content.includes("therapy")) {
    return [
      "What are the potential side effects?",
      "What is the success rate?",
      "Are there alternative treatments?",
      "What is the recommended duration?"
    ];
  }
  
  return defaultReplies;
}

// Enhanced Chat Response Interface
export interface EnhancedChatResponse {
  sanitizedMessage: string;
  quickReplies: string[];
  formattedGenomicData?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}/**
 * Data Sanitization Utilities
 * 
 * This module provides functions for sanitizing sensitive health information
 * to ensure HIPAA compliance in the application.
 */

// Enhanced Sensitive Data Detection
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
  if (!message) return message;
  
  let sanitizedMessage = message;

  if (containsSensitiveHealthInfo(message)) {
    sanitizedMessage = sanitizedMessage
      .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[REDACTED SSN]")
      .replace(/\b\d{9}\b/g, "[REDACTED MRN]")
      .replace(/\bpatient id\b/i, "[REDACTED PHI]")
      .replace(/\bphi\b/i, "[REDACTED PHI]")
      .replace(/\bdate of birth\b/i, "[REDACTED DOB]")
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

    return sanitizedMessage;
  }
  return sanitizedMessage;
}

// Advanced Genomic Data Formatting
export function formatGenomicData(data: any): string {
  try {
    // For larger genomic datasets, return as a well-structured object or pretty-printed JSON.
    if (typeof data === "object" && data !== null) {
      return JSON.stringify(data, null, 2); // For structured objects like gene mutations or clinical trials.
    }
    return String(data); // Handle non-structured or string-based data
  } catch (error) {
    console.error("Error formatting genomic data:", error);
    return "Error formatting genomic data";
  }
}

// Context-Aware Quick Reply Generation
export function generateQuickReplySuggestions(message: string, patientData: any): string[] {
  const content = message.toLowerCase();
  
  // Default replies
  const defaultReplies = [
    "Can you provide more details?",
    "What are the next steps?",
    "When was this data collected?"
  ];
  
  // Adding personalized replies based on patient data
  if (content.includes("mutation") || content.includes("genomic")) {
    return [
      "Show more details about this mutation",
      "What are the clinical implications?",
      "Compare with normal gene sequence",
      "What genetic tests are recommended?"
    ];
  }
  
  if (content.includes("lab") || content.includes("test") || content.includes("result")) {
    return [
      "When were these tests performed?",
      "Are there any abnormal results?",
      "What follow-up tests are recommended?",
      "How do these compare to previous results?"
    ];
  }
  
  if (content.includes("treatment") || content.includes("therapy")) {
    return [
      "What are the potential side effects?",
      "What is the success rate?",
      "Are there alternative treatments?",
      "What is the recommended duration?"
    ];
  }
  
  return defaultReplies;
}

// Enhanced Chat Response Interface
export interface EnhancedChatResponse {
  sanitizedMessage: string;
  quickReplies: string[];
  formattedGenomicData?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
} * 
 * This module provides functions for sanitizing sensitive health information
 * to ensure HIPAA compliance in the application.
 */

// Enhanced Sensitive Data Detection
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
  if (!message) return message;
  
  let sanitizedMessage = message;

  if (containsSensitiveHealthInfo(message)) {
    sanitizedMessage = sanitizedMessage
      .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[REDACTED SSN]")
      .replace(/\b\d{9}\b/g, "[REDACTED MRN]")
      .replace(/\bpatient id\b/i, "[REDACTED PHI]")
      .replace(/\bphi\b/i, "[REDACTED PHI]")
      .replace(/\bdate of birth\b/i, "[REDACTED DOB]")
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

    return sanitizedMessage;
  }
  return sanitizedMessage;
}

// Advanced Genomic Data Formatting
export function formatGenomicData(data: any): string {
  try {
    // For larger genomic datasets, return as a well-structured object or pretty-printed JSON.
    if (typeof data === "object" && data !== null) {
      return JSON.stringify(data, null, 2); // For structured objects like gene mutations or clinical trials.
    }
    return String(data); // Handle non-structured or string-based data
  } catch (error) {
    console.error("Error formatting genomic data:", error);
    return "Error formatting genomic data";
  }
}

// Context-Aware Quick Reply Generation
export function generateQuickReplySuggestions(message: string, patientData: any): string[] {
  const content = message.toLowerCase();
  
  // Default replies
  const defaultReplies = [
    "Can you provide more details?",
    "What are the next steps?",
    "When was this data collected?"
  ];
  
  // Adding personalized replies based on patient data
  if (content.includes("mutation") || content.includes("genomic")) {
    return [
      "Show more details about this mutation",
      "What are the clinical implications?",
      "Compare with normal gene sequence",
      "What genetic tests are recommended?"
    ];
  }
  
  if (content.includes("lab") || content.includes("test") || content.includes("result")) {
    return [
      "When were these tests performed?",
      "Are there any abnormal results?",
      "What follow-up tests are recommended?",
      "How do these compare to previous results?"
    ];
  }
  
  if (content.includes("treatment") || content.includes("therapy")) {
    return [
      "What are the potential side effects?",
      "What is the success rate?",
      "Are there alternative treatments?",
      "What is the recommended duration?"
    ];
  }
  
  return defaultReplies;
}

// Enhanced Chat Response Interface
export interface EnhancedChatResponse {
  sanitizedMessage: string;
  quickReplies: string[];
  formattedGenomicData?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}  };
} * Data Sanitization Utilities
 * 
 * This module provides functions for sanitizing sensitive health information
 * to ensure HIPAA compliance in the application.
 */

// Enhanced Sensitive Data Detection
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
  if (!message) return message;
  
  let sanitizedMessage = message;

  if (containsSensitiveHealthInfo(message)) {
    sanitizedMessage = sanitizedMessage
      .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[REDACTED SSN]")
      .replace(/\b\d{9}\b/g, "[REDACTED MRN]")
      .replace(/\bpatient id\b/i, "[REDACTED PHI]")
      .replace(/\bphi\b/i, "[REDACTED PHI]")
      .replace(/\bdate of birth\b/i, "[REDACTED DOB]")
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

    return sanitizedMessage;
  }
  return sanitizedMessage;
}

// Advanced Genomic Data Formatting
export function formatGenomicData(data: any): string {
  try {
    // For larger genomic datasets, return as a well-structured object or pretty-printed JSON.
    if (typeof data === "object" && data !== null) {
      return JSON.stringify(data, null, 2); // For structured objects like gene mutations or clinical trials.
    }
    return String(data); // Handle non-structured or string-based data
  } catch (error) {
    console.error("Error formatting genomic data:", error);
    return "Error formatting genomic data";
  }
}

// Context-Aware Quick Reply Generation
export function generateQuickReplySuggestions(message: string, patientData: any): string[] {
  const content = message.toLowerCase();
  
  // Default replies
  const defaultReplies = [
    "Can you provide more details?",
    "What are the next steps?",
    "When was this data collected?"
  ];
  
  // Adding personalized replies based on patient data
  if (content.includes("mutation") || content.includes("genomic")) {
    return [
      "Show more details about this mutation",
      "What are the clinical implications?",
      "Compare with normal gene sequence",
      "What genetic tests are recommended?"
    ];
  }
  
  if (content.includes("lab") || content.includes("test") || content.includes("result")) {
    return [
      "When were these tests performed?",
      "Are there any abnormal results?",
      "What follow-up tests are recommended?",
      "How do these compare to previous results?"
    ];
  }
  
  if (content.includes("treatment") || content.includes("therapy")) {
    return [
      "What are the potential side effects?",
      "What is the success rate?",
      "Are there alternative treatments?",
      "What is the recommended duration?"
    ];
  }
  
  return defaultReplies;
}

// Enhanced Chat Response Interface
export interface EnhancedChatResponse {
  sanitizedMessage: string;
  quickReplies: string[];
  formattedGenomicData?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}