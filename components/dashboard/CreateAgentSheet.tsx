"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  Bot, 
  MessageSquare, 
  Languages, 
  Mic, 
  Settings2, 
  Keyboard,
  Wrench,
} from "lucide-react"
import { createNewAgent } from "@/app/actions/agent"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { logger } from "@/lib/utils/logger"

const AVAILABLE_LANGUAGES = [
  { value: "EN", label: "English" },
  { value: "HI", label: "Hindi" },
  { value: "MR", label: "Marathi" },
  // Add more languages as needed
]

const AVAILABLE_VOICES = [
  { id: "3gsg3cxXyFLcGIfNbM6C", name: "Raju" },
  { id: "90ipbRoKi4CpHXvKVtl0", name: "Anika" },
] as const;

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  organisation: z.string().min(2, "Organisation must be at least 2 characters"),
  systemPrompt: z.string().min(10, "System prompt must be at least 10 characters"),
  greetingMessage: z.string().min(10, "Greeting message must be at least 10 characters"),
  voice: z.string(),
  language: z.array(z.string()).min(1, "Select at least one language"),
  advanced: z.boolean().default(false),
})

interface CreateAgentSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateAgentSheet({ open, onOpenChange }: CreateAgentSheetProps) {
  const router = useRouter()
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      organisation: "",
      systemPrompt: "",
      greetingMessage: "",
      voice: AVAILABLE_VOICES[0].id,
      language: [],
      advanced: false,
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
      const agent = await createNewAgent({
        ...values,
      })
      
      toast.success("Agent created successfully")
      
      router.push(`/dashboard/agent/${agent.agent_id}`)
      onOpenChange(false)
    } catch (error) {
      logger.error('Error creating agent:', error)
      toast.error("Failed to create agent")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create Agent</SheetTitle>
          <SheetDescription>
            Fill in the details to create a new agent.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Agent Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organisation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    Organisation
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Organisation Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Accordion type="single" collapsible className="w-full [&_[data-radix-accordion-trigger]]:no-underline">
              <AccordionItem value="configure">
                <AccordionTrigger className="flex gap-2">
                  <Settings2 className="h-5 w-5" />
                  Configure Agent
                </AccordionTrigger>
                <AccordionContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="systemPrompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Keyboard className="h-5 w-5" />
                          System Prompt
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter the system prompt..."
                            className="min-h-[100px]"
                            {...field}
                          />
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
                        <FormLabel className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5" />
                          Greeting Message
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter the greeting message..."
                            className="min-h-[100px]"
                            {...field}
                          />
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
                        <FormLabel className="flex items-center gap-2">
                          <Languages className="h-5 w-5" />
                          Languages
                        </FormLabel>
                        <Select
                          onValueChange={(value) => addLanguage(value)}
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {selectedLanguages.length === 0 
                                ? "Select languages" 
                                : `${selectedLanguages.length} ${selectedLanguages.length === 1 ? 'language' : 'languages'} selected`
                              }
                            </SelectValue>
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
                        <FormLabel className="flex items-center gap-2">
                          <Mic className="h-5 w-5" />
                          Voice Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {AVAILABLE_VOICES.find(v => v.id === field.value)?.name}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {AVAILABLE_VOICES.map((voice) => (
                              <SelectItem 
                                key={voice.id} 
                                value={voice.id}
                                className="flex justify-between items-center"
                              >
                                <span>{voice.name}</span>
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="ghost"
                                  className="h-6 w-6"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                  }}
                                >
                                  <Mic className="h-4 w-4" />
                                </Button>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="advanced">
                <AccordionTrigger className="flex gap-2">
                  <Wrench className="h-5 w-5" />
                  Advanced Settings
                </AccordionTrigger>
                <AccordionContent>
                  <FormField
                    control={form.control}
                    name="advanced"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Advanced Mode</FormLabel>
                          <FormDescription>
                            Enable advanced configuration options
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Agent"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
} 