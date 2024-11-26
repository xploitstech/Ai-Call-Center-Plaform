import { Suspense } from "react"
import { requireAuth } from "@/lib/auth/server"
import { getAgentsByUserId } from "@/lib/db/actions"
import { AgentsTable } from "@/components/dashboard/AgentsTable"
import { NoAgentsPlaceholder } from "@/components/dashboard/NoAgentsPlaceholder"
import { logger } from "@/lib/utils/logger"

export default async function DashboardPage() {
  const session = await requireAuth()
  
  try {
    logger.debug('Fetching agents for user:', session.user.id)
    const agents = await getAgentsByUserId(session.user.id)
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        <Suspense fallback={<div>Loading agents...</div>}>
          {agents.length === 0 ? (
            <NoAgentsPlaceholder />
          ) : (
            <AgentsTable agents={agents} />
          )}
        </Suspense>
      </div>
    )
  } catch (error) {
    logger.error('Error in dashboard page:', error)
    return <div>Something went wrong. Please try again later.</div>
  }
} 