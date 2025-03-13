"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface QuickReplyProps {
  suggestions: string[]
  onSelect: (suggestion: string) => void
}

export default function QuickReply({ suggestions, onSelect }: QuickReplyProps) {
  if (!suggestions.length) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap gap-2 mt-2"
    >
      {suggestions.map((suggestion, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Button
            variant="outline"
            size="sm"
            className="bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 transition-all"
            onClick={() => onSelect(suggestion)}
          >
            {suggestion}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}

