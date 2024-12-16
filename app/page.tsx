import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Phone, MessageSquare, Clock, Shield } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SignUpForm } from "@/components/auth/SignUpForm"
import { ContactForm } from "@/components/ContactForm"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center space-y-8 py-24 text-center">
        <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm font-medium">
          <Sparkles className="h-4 w-4" />
          <span>AI-Powered Customer Support</span>
        </div>
        <h1 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Let our Agent manage your <br className="hidden sm:inline" />
          customer interactions for you
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Empower your business with AI-driven customer support that never sleeps.
        </p>
        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                size="lg"
                className="group relative font-display transition-all duration-300 hover:pr-12"
              >
                Get Started
                <ArrowRight className="absolute right-4 opacity-0 transition-all duration-300 group-hover:opacity-100" size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-display">Create an account</DialogTitle>
                <DialogDescription>
                  Get started with AI Call Center today
                </DialogDescription>
              </DialogHeader>
              <SignUpForm />
            </DialogContent>
          </Dialog>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
            <Phone className="h-8 w-8 text-primary" />
            <h3 className="font-display text-xl font-semibold">24/7 Availability</h3>
            <p className="text-center text-sm text-muted-foreground">Always ready to handle customer calls</p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
            <MessageSquare className="h-8 w-8 text-primary" />
            <h3 className="font-display text-xl font-semibold">Smart Responses</h3>
            <p className="text-center text-sm text-muted-foreground">AI-powered natural conversations</p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
            <Shield className="h-8 w-8 text-primary" />
            <h3 className="font-display text-xl font-semibold">Secure & Reliable</h3>
            <p className="text-center text-sm text-muted-foreground">Enterprise-grade security</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container py-24">
        <h2 className="mb-12 text-center font-display text-3xl font-bold tracking-tight">
          What our customers say
        </h2>
        <Carousel className="mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-4">
                  <blockquote className="space-y-2">
                    <p className="text-lg italic">{testimonial.content}</p>
                    <footer className="text-sm font-medium text-muted-foreground">
                      — {testimonial.author}
                    </footer>
                  </blockquote>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t">
        <div className="container flex h-24 flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <p className="font-display text-center text-sm leading-loose text-muted-foreground md:text-left">
            By NullPoint Pvt Ltd
          </p>
          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost"
                  className="group relative font-display transition-all duration-300 hover:pr-12"
                >
                  About AI Call Center
                  <ArrowRight className="absolute right-4 opacity-0 transition-all duration-300 group-hover:opacity-100" size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-display">About AI Call Center</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p>
                    AI Call Center is a cutting-edge platform that leverages artificial intelligence to revolutionize customer support operations.
                  </p>
                  <p>
                    Our platform enables businesses to provide 24/7 customer support through AI agents that can understand, respond, and learn from interactions.
                  </p>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost"
                  className="group relative font-display transition-all duration-300 hover:pr-12"
                >
                  Contact Us
                  <ArrowRight className="absolute right-4 opacity-0 transition-all duration-300 group-hover:opacity-100" size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-display">Contact Us</DialogTitle>
                  <DialogDescription>
                    Send us a message and we'll get back to you soon.
                  </DialogDescription>
                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </footer>
    </div>
  )
}

const testimonials = [
  {
    content: "AI Call Center has transformed how we handle customer support. Our response times have improved dramatically.",
    author: "Sarah Johnson, CEO of TechCorp"
  },
  {
    content: "The AI agents are incredibly efficient and our customers love the 24/7 availability.",
    author: "Michael Chen, Support Manager"
  },
  {
    content: "Implementation was smooth and the results were immediate. Highly recommended!",
    author: "Lisa Rodriguez, Operations Director"
  }
]
