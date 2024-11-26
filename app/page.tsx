import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
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
      <section className="container flex flex-col items-center justify-center space-y-4 pt-24 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          Let our Agent manage your customer interactions for you
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Empower your business with AI-driven customer support that never sleeps.
        </p>
        <div className="space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg">Get Started</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create an account</DialogTitle>
                <DialogDescription>
                  Get started with AI Call Center today
                </DialogDescription>
              </DialogHeader>
              <SignUpForm />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container py-24">
        <h2 className="mb-12 text-center text-3xl font-bold">
          What our customers say
        </h2>
        <Carousel className="mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-4">
                  <blockquote className="space-y-2">
                    <p className="text-lg">{testimonial.content}</p>
                    <footer className="text-sm text-muted-foreground">
                      {testimonial.author}
                    </footer>
                  </blockquote>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t">
        <div className="container flex h-24 flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            By NextGen Tech
          </p>
          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost">About AI Call Center</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>About AI Call Center</DialogTitle>
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
                <Button variant="ghost">Contact Us</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Contact Us</DialogTitle>
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
