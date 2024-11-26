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
      setIsLoading(true)
      setError(null)
      logger.debug('Attempting sign in:', email)
      
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

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
      logger.debug('Attempting sign up:', email)
      
      const user = await signUpAction(email, password, name)
      if (!user) throw new Error('Failed to create user')

      logger.info('User signed up successfully:', email)
      router.refresh()
      router.push('/dashboard')
    } catch (e: any) {
      logger.error('Sign up error:', e.message)
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoading(true)
      logger.debug('Attempting sign out')
      
      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) throw signOutError

      logger.info('User signed out successfully')
      router.refresh()
      router.push('/')
    } catch (e: any) {
      logger.error('Sign out error:', e.message)
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