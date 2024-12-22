"use client"

import { Button } from "@/components/ui/button"
import { Mic, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useVoiceAudio } from "@/hooks/useVoiceAudio"
import { logger } from "@/lib/utils/logger"

export function WelcomeMessage() {
  const { isPlaying, playVoice } = useVoiceAudio()

  const handlePlay = async () => {
    try {
      logger.info('Playing welcome message')
      // Using Raju's voice ID for the welcome message
      await playVoice("3gsg3cxXyFLcGIfNbM6C")
    } catch (error) {
      logger.error('Failed to play welcome message:', error)
      toast.error("Failed to play welcome message", {
        description: "Please check your internet connection and try again"
      })
    }
  }

  return (
    <Button 
      variant="outline" 
      size="sm"
      disabled={isPlaying}
      onClick={handlePlay}
      className="gap-2"
    >
      {isPlaying ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
      Play Welcome Message
    </Button>
  )
} 