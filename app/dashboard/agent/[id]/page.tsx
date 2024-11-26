import { getAgentById } from "@/lib/db/actions"
import { requireAuth } from "@/lib/auth/server"
import { notFound } from "next/navigation"
import { logger } from "@/lib/utils/logger"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AgentAnalytics } from "../../../../components/dashboard/agent/AgentAnalytics"
import { AgentConfiguration } from "../../../../components/dashboard/agent/AgentConfiguration"
import { AgentAdvanced } from "../../../../components/dashboard/agent/AgentAdvanced"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">{agent.name}</h1>
          </div>
        </div>

        <Tabs defaultValue="analytics" className="space-y-4">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          <TabsContent value="analytics">
            <AgentAnalytics agent={agent} />
          </TabsContent>
          <TabsContent value="configuration">
            <AgentConfiguration agent={agent} />
          </TabsContent>
          <TabsContent value="advanced">
            <AgentAdvanced agent={agent} />
          </TabsContent>
        </Tabs>
      </div>
    )
  } catch (error) {
    logger.error('Error in agent dashboard:', error)
    return <div>Something went wrong. Please try again later.</div>
  }
} 