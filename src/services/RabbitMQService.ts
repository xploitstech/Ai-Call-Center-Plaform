import amqp, { Connection, Channel } from 'amqplib';
import { logger } from "@/lib/utils/logger";

export class RabbitMQService {
    private connection: Connection | null = null;
    private channel: Channel | null = null;

    constructor(private readonly url: string) {}

    async initialize() {
        try {
            // Create connection
            this.connection = await amqp.connect(this.url);
            
            // Create channel
            this.channel = await this.connection.createChannel();
            
            logger.info('Successfully connected to RabbitMQ');
        } catch (error) {
            logger.error('Failed to connect to RabbitMQ:', error);
            throw error;
        }
    }

    async createUserExchange(userId: string) {
        if (!this.channel) {
            throw new Error('RabbitMQ channel not initialized');
        }

        const exchangeName = `${userId}_exchange`;
        
        await this.channel.assertExchange(exchangeName, 'direct', {
            durable: true,
        });

        console.log(`Created exchange: ${exchangeName}`);
        return exchangeName;
    }

    async createAgentQueue(userId: string, agentId: string) {
        if (!this.channel) {
            throw new Error('RabbitMQ channel not initialized');
        }

        const exchangeName = `${userId}_exchange`;
        const queueName = `${agentId}_queue`;
        const routingKey = agentId;

        // Create queue
        await this.channel.assertQueue(queueName, {
            durable: true,
        });

        // Bind queue to exchange
        await this.channel.bindQueue(queueName, exchangeName, routingKey);

        console.log(`Created and bound queue: ${queueName} to exchange: ${exchangeName}`);
        return queueName;
    }

    async closeConnection() {
        if (this.channel) {
            await this.channel.close();
        }
        if (this.connection) {
            await this.connection.close();
        }
    }
} 