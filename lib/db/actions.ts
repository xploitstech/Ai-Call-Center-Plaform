import { db } from "@/lib/db";
import { users, agents, type NewUser, type NewAgent } from "@/db/schema";
import { eq } from "drizzle-orm";
import { logger } from "@/lib/utils/logger";

export async function createUser(data: NewUser) {
  try {
    logger.debug('Creating new user:', data.email);
    const [user] = await db.insert(users).values(data).returning();
    logger.info('User created successfully:', user.id);
    return user;
  } catch (error) {
    logger.error('Error creating user:', error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    logger.debug('Fetching user by email:', email);
    const [user] = await db.select().from(users).where(eq(users.email, email));
    logger.info('User fetched successfully:', user?.id);
    return user;
  } catch (error) {
    logger.error('Error getting user:', error);
    throw error;
  }
}

export async function createAgent(data: NewAgent) {
  try {
    const [agent] = await db.insert(agents).values(data).returning();
    return agent;
  } catch (error) {
    console.error("Error creating agent:", error);
    throw error;
  }
}

export async function getAgentsByUserId(userId: number) {
  try {
    return await db.select().from(agents).where(eq(agents.user_id, userId));
  } catch (error) {
    console.error("Error getting agents:", error);
    throw error;
  }
} 