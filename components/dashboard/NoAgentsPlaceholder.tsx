import { CreateAgentButton } from "./CreateAgentButton"

export function NoAgentsPlaceholder() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <h2 className="text-2xl font-semibold">Let our AI agents handle your customers</h2>
      <p className="mt-2 text-muted-foreground">
        Create your first agent to get started with AI Call Center
      </p>
      <div className="mt-4">
        <CreateAgentButton />
      </div>
    </div>
  )
} 