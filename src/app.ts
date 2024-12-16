import { RabbitMQService } from './services/RabbitMQService';
import { rabbitmqConfig } from './config/rabbitmq.config';

// Initialize RabbitMQ service
const rabbitMQService = new RabbitMQService(rabbitmqConfig.url);

// In your app startup code
async function startApp() {
    try {
        await rabbitMQService.initialize();
        
        // Example usage:
        // When a new user is created
        await rabbitMQService.createUserExchange('user123');
        
        // When a new agent is created for that user
        await rabbitMQService.createAgentQueue('user123', 'agent456');
        
    } catch (error) {
        console.error('Failed to start application:', error);
        process.exit(1);
    }
}

// Handle application shutdown
process.on('SIGINT', async () => {
    await rabbitMQService.closeConnection();
    process.exit(0);
});

startApp(); 