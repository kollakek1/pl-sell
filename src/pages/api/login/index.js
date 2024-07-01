
import { connectToMongo } from '../../../lib/mongodb';
import { connectToRedis } from '../../../lib/redis';
import { ObjectId } from 'mongodb';

export async function POST({ request }) {
    const redisClient = await connectToRedis();
    const { db: mongoDb } = await connectToMongo();

    const body = await request.text();
    const { userEmail, userCode } = JSON.parse(body);

    const code = await redisClient.get(userEmail);

    if (userCode === code) {
        const productsCollection = mongoDb.collection('products');
        const userProductsCollection = mongoDb.collection('userproduct');

        const userProduct = await userProductsCollection.findOne({ email: userEmail, orderId: userCode });
        const product = await productsCollection.findOne({ _id: new ObjectId(userProduct.key) });
        const products = [product];
        console.log(products);
        return new Response(JSON.stringify(products));
    }

    return new Response(false);
}
