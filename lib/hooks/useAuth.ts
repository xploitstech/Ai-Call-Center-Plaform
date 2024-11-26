"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { signUp as signUpAction } from "@/app/actions/auth"
import { logger } from "@/lib/utils/logger"

export function useAuth() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()

  const signIn = async (email: string, password: string) => {
    try {
      logger.debug('Attempting sign in:', email)
      setIsLoading(true)
      setError(null)
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      logger.info('User signed in successfully:', email)
      router.refresh()
      router.push('/dashboard')
    } catch (e: any) {
      logger.error('Sign in error:', e.message)
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const user = await signUpAction(email, password, name)
      if (!user) throw new Error("Failed to create user")

      router.refresh()
      router.push('/dashboard')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      router.refresh()
      router.push('/')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    signIn,
    signUp,
    signOut,
    isLoading,
    error,
  }
} 