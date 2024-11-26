import { getAgentById } from "@/lib/db/actions"
import { requireAuth } from "@/lib/auth/server"
import { notFound } from "next/navigation"
import { logger } from "@/lib/utils/logger"

export default async function AgentDashboardPage({
  params
}: {
  params: { id: string }
}) {
  const session = await requireAuth()
  
  try {
    const agent = await getAgentById(parseInt(params.id))
    
    if (!agent || agent.user_id !== session.user.id) {
      notFound()
    }

    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{agent.name}</h1>
        {/* Add agent dashboard content */}
      </div>
    )
  } catch (error) {
    logger.error('Error in agent dashboard:', error)
    return <div>Something went wrong. Please try again later.</div>
  }
} 