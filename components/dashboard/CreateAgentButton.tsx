"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CreateAgentSheet } from "./CreateAgentSheet"

export function CreateAgentButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Create New Agent
      </Button>
      <CreateAgentSheet open={open} onOpenChange={setOpen} />
    </>
  )
} 