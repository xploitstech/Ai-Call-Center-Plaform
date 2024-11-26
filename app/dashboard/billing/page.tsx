import { requireAuth } from "@/lib/auth/server"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, CreditCard } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for trying out our service",
    features: [
      "1 AI Agent",
      "100 conversations/month",
      "Basic analytics",
      "Email support",
    ],
    current: true,
  },
  {
    name: "Pro",
    price: "$49",
    description: "Best for growing businesses",
    features: [
      "5 AI Agents",
      "Unlimited conversations",
      "Advanced analytics",
      "Priority support",
      "Custom voice options",
    ],
    current: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large scale operations",
    features: [
      "Unlimited AI Agents",
      "Unlimited conversations",
      "Custom analytics",
      "24/7 support",
      "Custom integration",
      "SLA guarantee",
    ],
    current: false,
  },
]

export default async function BillingPage() {
  await requireAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and billing</p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are currently on the Starter plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <CreditCard className="h-6 w-6" />
            <div>
              <p className="font-medium">Free Trial</p>
              <p className="text-sm text-muted-foreground">Valid until Apr 1, 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.current ? "border-primary" : undefined}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.current ? "outline" : "default"}>
                {plan.current ? "Current Plan" : "Upgrade"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>View your past payments</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">No payment history available</p>
        </CardContent>
      </Card>
    </div>
  )
} 