"use client"

import { Agent } from "@/db/schema"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface AgentsTableProps {
  agents: Agent[]
}

export function AgentsTable({ agents }: AgentsTableProps) {
  const router = useRouter()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Agent</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agents.map((agent) => (
          <TableRow key={agent.agent_id}>
            <TableCell>
              <Badge>Active</Badge>
            </TableCell>
            <TableCell>
              <div>
                <p className="font-medium">{agent.name}</p>
                <p className="text-sm text-muted-foreground">
                  {agent.language.join(", ")}
                </p>
              </div>
            </TableCell>
            <TableCell>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => router.push(`/dashboard/agent/${agent.agent_id}`)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 