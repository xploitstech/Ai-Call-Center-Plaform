"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form } from "@/components/ui/form"
import { submitContactForm } from "@/app/actions/contact"
import { logger } from "@/lib/utils/logger"

const contactSchema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
})

export function ContactForm() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  })

  async function onSubmit(data: z.infer<typeof contactSchema>) {
    try {
      logger.debug('Submitting contact form');
      await submitContactForm(data)
      form.reset()
      // You can add toast notification here for success
    } catch (error) {
      logger.error('Contact form submission failed:', error);
      // You can add toast notification here for error
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" placeholder="email@example.com" {...form.register('email')} />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="message">Message</label>
          <Textarea id="message" placeholder="Your message..." {...form.register('message')} />
          {form.formState.errors.message && (
            <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  )
} 