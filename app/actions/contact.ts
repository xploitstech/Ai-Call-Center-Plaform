"use server"

import { logger } from "@/lib/utils/logger";
import { z } from "zod";

const contactSchema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
});

export async function submitContactForm(data: z.infer<typeof contactSchema>) {
  try {
    logger.debug('Processing contact form submission:', data.email);
    
    // Validate the data
    const validated = contactSchema.parse(data);
    
    // Here you would typically send this to your email service
    // For MVP, we'll just log it
    logger.info('Contact form submitted:', {
      email: validated.email,
      messageLength: validated.message.length,
    });

    return { success: true };
  } catch (error) {
    logger.error('Error processing contact form:', error);
    throw error;
  }
} 