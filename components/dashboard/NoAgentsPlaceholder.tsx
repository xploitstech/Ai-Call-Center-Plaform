import { CreateAgentButton } from "./CreateAgentButton"

export function NoAgentsPlaceholder() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <h2 className="text-4xl font-semibold mb-4">Let our AI agents handle your customers</h2>
      <p className="text-lg text-muted-foreground mb-8">
        Create your first agent to get started with AI Call Center
      </p>
      <div>
        <CreateAgentButton />
      </div>
    </div>
  )
} 