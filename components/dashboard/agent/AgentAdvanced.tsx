"use client"

import { Agent } from "@/db/schema"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"
import { updateAgent } from "@/lib/db/actions"
import { Button } from "@/components/ui/button"
import { Loader2, AlertTriangle } from "lucide-react"

interface AgentAdvancedProps {
  agent: Agent
}

export function AgentAdvanced({ agent }: AgentAdvancedProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [debugMode, setDebugMode] = useState(agent.debug_mode ?? false)
  const [loggingEnabled, setLoggingEnabled] = useState(agent.logging_enabled ?? false)

  async function handleToggleDebug(enabled: boolean) {
    try {
      setIsLoading(true)
      setDebugMode(enabled)
      await updateAgent(agent.agent_id, { debug_mode: enabled })
      toast.success("Debug mode " + (enabled ? "enabled" : "disabled"))
    } catch {
      toast.error("Failed to update debug settings")
      setDebugMode(!enabled)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleToggleLogging(enabled: boolean) {
    try {
      setIsLoading(true)
      setLoggingEnabled(enabled)
      await updateAgent(agent.agent_id, { logging_enabled: enabled })
      toast.success("Logging " + (enabled ? "enabled" : "disabled"))
    } catch {
      toast.error("Failed to update logging settings")
      setLoggingEnabled(!enabled)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Debug Mode</CardTitle>
          <CardDescription>
            Enable detailed debugging information for this agent
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>Debug Mode {debugMode ? "Enabled" : "Disabled"}</Label>
            <p className="text-sm text-muted-foreground">
              This will enable verbose logging and debugging tools
            </p>
          </div>
          <Switch
            checked={debugMode}
            onCheckedChange={handleToggleDebug}
            disabled={isLoading}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversation Logging</CardTitle>
          <CardDescription>
            Enable detailed logging of all conversations
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>Logging {loggingEnabled ? "Enabled" : "Disabled"}</Label>
            <p className="text-sm text-muted-foreground">
              Store detailed logs of all conversations for analysis
            </p>
          </div>
          <Switch
            checked={loggingEnabled}
            onCheckedChange={handleToggleLogging}
            disabled={isLoading}
          />
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle>Danger Zone</CardTitle>
          </div>
          <CardDescription>
            Actions here can have serious consequences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Reset Agent</Label>
              <p className="text-sm text-muted-foreground">
                Reset all agent settings to default
              </p>
            </div>
            <Button variant="destructive" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Agent"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 