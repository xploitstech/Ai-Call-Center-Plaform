"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/hooks/useAuth"
import { Home, Settings, CreditCard, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { signOut } = useAuth()
  const router = useRouter()

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col justify-between border-r bg-background p-6">
        <div className="space-y-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-base"
            onClick={() => router.push('/dashboard')}
          >
            <Home className="mr-2 h-5 w-5" />
            Home
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-base"
            onClick={() => router.push('/dashboard/settings')}
          >
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-base"
            onClick={() => router.push('/dashboard/billing')}
          >
            <CreditCard className="mr-2 h-5 w-5" />
            Billing
          </Button>
        </div>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-base",
            "hover:bg-red-500 hover:text-white"
          )}
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  )
} 