"use client"

import { Agent } from "@/db/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { updateAgent } from "@/lib/db/actions"

const formSchema = z.object({
  name: z.string().min(2),
  systemPrompt: z.string().min(10),
  greetingMessage: z.string().min(10),
  voice: z.enum(["Type 1", "Type 2"]),
  language: z.array(z.string()).min(1),
})

interface AgentConfigurationProps {
  agent: Agent
}

const AVAILABLE_LANGUAGES = [
  { value: "EN", label: "English" },
  { value: "HI", label: "Hindi" },
  { value: "MR", label: "Marathi" },
]

export function AgentConfiguration({ agent }: AgentConfigurationProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(agent.language)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: agent.name!,
      systemPrompt: agent.system_prompt!,
      greetingMessage: agent.greeting_message!,
      voice: agent.voice as "Type 1" | "Type 2",
      language: agent.language,
    },
  })

  const addLanguage = (lang: string) => {
    if (!selectedLanguages.includes(lang)) {
      const newLanguages = [...selectedLanguages, lang]
      setSelectedLanguages(newLanguages)
      form.setValue('language', newLanguages)
    }
  }

  const removeLanguage = (lang: string) => {
    const newLanguages = selectedLanguages.filter(l => l !== lang)
    setSelectedLanguages(newLanguages)
    form.setValue('language', newLanguages)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      await updateAgent(agent.agent_id, {
        name: values.name,
        system_prompt: values.systemPrompt,
        greeting_message: values.greetingMessage,
        voice: values.voice,
        language: values.language,
      })
      toast.success("Agent updated successfully")
    } catch (error) {
      toast.error("Failed to update agent")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="systemPrompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>System Prompt</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="greetingMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Greeting Message</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={() => (
            <FormItem>
              <FormLabel>Languages</FormLabel>
              <Select onValueChange={addLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select languages" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_LANGUAGES.map((lang) => (
                    <SelectItem
                      key={lang.value}
                      value={lang.value}
                      disabled={selectedLanguages.includes(lang.value)}
                    >
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedLanguages.map((lang) => (
                  <Badge
                    key={lang}
                    variant="secondary"
                    className="px-2 py-1 flex items-center gap-1"
                  >
                    {AVAILABLE_LANGUAGES.find(l => l.value === lang)?.label}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeLanguage(lang)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a voice type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Type 1">Type 1</SelectItem>
                  <SelectItem value="Type 2">Type 2</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  )
} 