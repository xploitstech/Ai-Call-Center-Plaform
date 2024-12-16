"use server"

import { createClient } from "@/lib/supabase/server";
import { createUser, getUserByEmail } from "@/lib/db/actions";
import { getRabbitMQService } from "@/lib/services/rabbitmq";
import { logger } from "@/lib/utils/logger";

export async function signUp(email: string, password: string, name: string) {
  const supabase = createClient();

  try {
    // First create the auth user in Supabase
    const { data: { user }, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!user) throw new Error("User creation failed");

    // Check if user already exists in our database
    const existingUser = await getUserByEmail(email);
    if (existingUser) return existingUser;

    // Create the user in our database with the Supabase UUID
    const dbUser = await createUser({
      id: user.id,
      email,
      name,
    });

    // Create RabbitMQ exchange for the user
    const rabbitMQ = await getRabbitMQService();
    await rabbitMQ.createUserExchange(user.id);
    logger.info('Created RabbitMQ exchange for user:', user.id);

    return dbUser;
  } catch (error) {
    logger.error('Error in signUp:', error);
    throw error;
  }
} 