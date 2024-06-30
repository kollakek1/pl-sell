
import { createClient } from 'redis';

let redisClient;

export async function connectToRedis() {
    if (!redisClient) {
        redisClient = createClient({
            password: import.meta.env.REDIS_PASSWORD,
            socket: {
                host: import.meta.env.REDIS_HOST,
                port: 11772
            }
        });

        redisClient.on('error', (err) => {
            console.error('Redis Client Error', err);
        });

        await redisClient.connect();
        console.log('Connected to Redis');
    }
    return redisClient;
}
