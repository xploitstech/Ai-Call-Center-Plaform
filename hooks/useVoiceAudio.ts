"use client"

import { useState, useCallback, useEffect } from "react"
import { logger } from "@/lib/utils/logger"

// Function to convert Blob to Base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

// Function to convert Base64 to Blob
const base64ToBlob = async (base64: string): Promise<Blob> => {
  const response = await fetch(base64)
  return response.blob()
}

export function useVoiceAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)

  const playVoice = useCallback(async (voiceId: string) => {
    try {
      setIsPlaying(true)
      logger.info(`Starting voice preview for voice ID: ${voiceId}`)

      let audioBlob: Blob
      
      // Check localStorage first
      const storedAudio = localStorage.getItem(`voice-${voiceId}`)
      
      if (storedAudio) {
        logger.info(`Using stored audio for voice ID: ${voiceId}`)
        audioBlob = await base64ToBlob(storedAudio)
      } else {
        logger.info(`No stored audio found for voice ID: ${voiceId}, making API call...`)
        
        // If not in storage, fetch from API
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY!,
          },
          body: JSON.stringify({
            text: "Welcome to AI call center By NullPoint Technologies!. How may I assist you today?",
            model_id: "eleven_monolingual_v1",
            voice_settings: {
              stability: 0.7,
              similarity_boost: 0.85,
              style: 0,
              use_speaker_boost: true
            }
          }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          logger.error('ElevenLabs API error:', {
            status: response.status,
            statusText: response.statusText,
            error: errorData,
            voiceSettings: {
              stability: 0.5,
              similarity_boost: 0.75,
              style: 0,
              use_speaker_boost: true
            }
          })
          throw new Error("Failed to generate speech")
        }

        logger.info(`Successfully received audio from API for voice ID: ${voiceId}`, {
          voiceSettings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0,
            use_speaker_boost: true
          }
        })
        audioBlob = await response.blob()
        
        // Store in localStorage
        const base64Audio = await blobToBase64(audioBlob)
        localStorage.setItem(`voice-${voiceId}`, base64Audio)
        logger.info(`Stored audio for voice ID: ${voiceId}`)
      }

      // Stop any currently playing audio
      if (currentAudio) {
        logger.debug('Stopping currently playing audio')
        currentAudio.pause()
        currentAudio.remove()
      }

      const audioUrl = URL.createObjectURL(audioBlob)
      const newAudio = new Audio(audioUrl)
      setCurrentAudio(newAudio)
      
      logger.debug('Starting audio playback')
      await newAudio.play()
      
      newAudio.onended = () => {
        logger.debug('Audio playback completed')
        setIsPlaying(false)
        URL.revokeObjectURL(audioUrl)
      }

    } catch (error) {
      logger.error('Error in voice preview:', error)
      throw error
    } finally {
      if (!isPlaying) {
        logger.debug('Voice preview completed or failed')
      }
    }
  }, [currentAudio, isPlaying])

  return {
    isPlaying,
    playVoice
  }
} 