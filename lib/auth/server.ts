import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function getSession() {
  const supabase = createClient()
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    
    return session
  } catch (error) {
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()
  
  if (!session) {
    redirect('/login')
  }

  return session
} 