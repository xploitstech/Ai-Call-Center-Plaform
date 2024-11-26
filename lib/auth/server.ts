import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { logger } from '@/lib/utils/logger'

export async function getSession() {
  const supabase = createClient()
  try {
    logger.debug('Fetching auth session')
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      logger.error('Error fetching session:', error)
      throw error
    }
    
    if (!session) {
      logger.debug('No session found')
    } else {
      logger.debug('Session found for user:', session.user.id)
    }
    
    return session
  } catch (error) {
    logger.error('Session fetch failed:', error)
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()
  
  if (!session) {
    logger.debug('No auth session, redirecting to /login')
    redirect('/login')
  }

  return session
} 