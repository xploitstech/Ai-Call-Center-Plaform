"use server"

import { createAgent } from "@/lib/db/actions"
import { logger } from "@/lib/utils/logger"
import { revalidatePath } from "next/cache"
import { getSession } from "@/lib/auth/server"

export async function createNewAgent(data: {
  name: string
  organisation: string
  systemPrompt: string
  greetingMessage: string
  voice: string
  language: string[]
}) {
  try {
    const session = await getSession()
    if (!session) {
      throw new Error("Not authenticated")
    }

    logger.debug('Creating new agent:', data.name)
    const agent = await createAgent({
      name: data.name,
      organisation: data.organisation,
      system_prompt: data.systemPrompt,
      greeting_message: data.greetingMessage,
      voice: data.voice,
      language: data.language,
      user_id: session.user.id,
    })
    
    logger.info('Agent created successfully:', agent.agent_id)
    revalidatePath('/dashboard')
    return agent
  } catch (error) {
    logger.error('Error creating agent:', error)
    throw error
  }
} 