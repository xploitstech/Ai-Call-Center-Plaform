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
    logger.debug('Creating new agent:', data.name);
    const [agent] = await db.insert(agents).values(data).returning();
    logger.info('Agent created successfully:', agent.agent_id);
    return agent;
  } catch (error) {
    logger.error('Error creating agent:', error);
    throw error;
  }
}

export async function getAgentsByUserId(userId: number) {
  try {
    logger.debug('Fetching agents for user:', userId);
    const userAgents = await db.select().from(agents).where(eq(agents.user_id, userId));
    logger.info('Fetched agents successfully:', userAgents.length);
    return userAgents;
  } catch (error) {
    logger.error('Error getting agents:', error);
    throw error;
  }
}

export async function updateAgent(agentId: number, data: Partial<NewAgent>) {
  try {
    logger.debug('Updating agent:', agentId);
    const [agent] = await db
      .update(agents)
      .set(data)
      .where(eq(agents.agent_id, agentId))
      .returning();
    logger.info('Agent updated successfully:', agent.agent_id);
    return agent;
  } catch (error) {
    logger.error('Error updating agent:', error);
    throw error;
  }
}

export async function deleteAgent(agentId: number) {
  try {
    logger.debug('Deleting agent:', agentId);
    const [agent] = await db
      .delete(agents)
      .where(eq(agents.agent_id, agentId))
      .returning();
    logger.info('Agent deleted successfully:', agent.agent_id);
    return agent;
  } catch (error) {
    logger.error('Error deleting agent:', error);
    throw error;
  }
} 