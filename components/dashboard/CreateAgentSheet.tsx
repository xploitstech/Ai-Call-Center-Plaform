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
  Building2,
  Phone,
  Loader2,
  ExternalLink,
} from "lucide-react"
import { createNewAgent } from "@/app/actions/agent"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { logger } from "@/lib/utils/logger"
import { WelcomeMessage } from "./WelcomeMessage"
import { useVoiceAudio } from "@/hooks/useVoiceAudio"

const AVAILABLE_VOICES = [
  { id: "3gsg3cxXyFLcGIfNbM6C", name: "Raju" },
  { id: "90ipbRoKi4CpHXvKVtl0", name: "Anika" },
] as const;

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  systemPrompt: z.string().min(10, "System prompt must be at least 10 characters"),
  greetingMessage: z.string().min(10, "Greeting message must be at least 10 characters"),
  voice: z.string().min(1, "Please select a voice"),
  language: z.array(z.string()).min(1, "Select at least one language"),
  organization: z.string().min(2, "Organization must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  advanced: z.boolean().default(false),
})

interface CreateAgentSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const AVAILABLE_LANGUAGES = [
  { value: "EN", label: "English" },
  { value: "HI", label: "Hindi" },
  { value: "MR", label: "Marathi" },
  // Add more languages as needed
]

export function CreateAgentSheet({ open, onOpenChange }: CreateAgentSheetProps) {
  const router = useRouter()
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { isPlaying, playVoice } = useVoiceAudio()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      systemPrompt: "",
      greetingMessage: "",
      voice: AVAILABLE_VOICES[0].id,
      language: [],
      organization: "",
      phone: "",
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
          <SheetDescription className="space-y-4">
            <div>Fill in the details to create a new agent.</div>
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
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Organization
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Organization Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" type="tel" {...field} />
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
                        <div className="flex items-center gap-2">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a voice type" />
                            </SelectTrigger>
                            <SelectContent>
                              {AVAILABLE_VOICES.map((voice) => (
                                <SelectItem key={voice.id} value={voice.id}>
                                  {voice.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={isPlaying || !field.value}
                            onClick={async () => {
                              try {
                                logger.info(`Attempting to preview voice: ${field.value}`)
                                await playVoice(field.value)
                              } catch (error) {
                                logger.error('Voice preview failed:', error)
                                toast.error("Failed to play voice preview", {
                                  description: "Please check your internet connection and try again"
                                })
                              }
                            }}
                          >
                            {isPlaying ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Mic className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
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

            <div className="space-y-4 pt-4">
              <Button
                type="button"
                variant="default"
                className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
                onClick={() => window.open('https://www.plivo.com/virtual-phone-numbers/', '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
                Get Number for your Agent
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Creating..." : "Create Agent"}
              </Button>
              <FormDescription className="text-center text-sm text-muted-foreground">
                Note: We use Plivo to handle calls. Please ensure to use only Plivo-provided phone numbers for optimal performance.
              </FormDescription>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
} 