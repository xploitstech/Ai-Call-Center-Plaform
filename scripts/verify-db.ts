import { db } from "@/lib/db"
import { logger } from "@/lib/utils/logger"
import { users, agents } from "@/db/schema"

async function verifyDatabaseSetup() {
  try {
    logger.debug('Verifying database connection...');
    
    // Test users table
    const usersResult = await db.select().from(users).limit(1);
    logger.info('Users table verified');
    
    // Test agents table
    const agentsResult = await db.select().from(agents).limit(1);
    logger.info('Agents table verified');
    
    logger.success('Database setup verified successfully');
  } catch (error) {
    logger.error('Database verification failed:', error);
    process.exit(1);
  }
}

verifyDatabaseSetup(); 