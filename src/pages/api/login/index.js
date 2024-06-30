
import { connectToMongo } from '../../../lib/mongodb';
import { connectToRedis } from '../../../lib/redis';

export async function POST({ request }) {
    const redisClient = await connectToRedis();
    const { db: mongoDb } = await connectToMongo();

    const body = await request.text();
    const { userEmail, userCode } = JSON.parse(body);

    const code = await redisClient.get(userEmail);

    if (userCode === code) {
        const productsCollection = mongoDb.collection('userproduct');
        const products = await productsCollection.find({ email: userEmail }).toArray();

        return new Response(JSON.stringify(products));
    }

    return new Response(false);
}
