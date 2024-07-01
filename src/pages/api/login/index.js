
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
        const productsCollection = mongoDb.collection('userproduct');
        const products = await productsCollection.find({ email: userEmail }).toArray();
    
        const productDetailsCollection = mongoDb.collection('products');
    
        const enrichedProducts = [];
    
        for (const userProduct of products) {

            const { orderId, key } = userProduct;
            

            const productDetails = await productDetailsCollection.findOne({ _id: ObjectId(orderId) });
            
            if (productDetails) {

                enrichedProducts.push({
                    ...productDetails,
                    ...(key && { key }),
                });
            }
        }
    
        return new Response(JSON.stringify(enrichedProducts));
    }
    

    return new Response(false);
}
