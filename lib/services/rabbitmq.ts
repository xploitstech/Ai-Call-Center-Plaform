import { RabbitMQService } from '@/services/RabbitMQService';
import { logger } from "@/lib/utils/logger";

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqps://kluhborm:RvkJGHvXNPw_agRGvoQO1U1xY0Y_UPFJ@puffin.rmq2.cloudamqp.com/kluhborm';

class RabbitMQInstance {
    private static instance: RabbitMQService;

    static async getInstance(): Promise<RabbitMQService> {
        if (!RabbitMQInstance.instance) {
            logger.debug('Initializing RabbitMQ service');
            RabbitMQInstance.instance = new RabbitMQService(RABBITMQ_URL);
            await RabbitMQInstance.instance.initialize();
        }
        return RabbitMQInstance.instance;
    }
}

export const getRabbitMQService = RabbitMQInstance.getInstance; 