
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
    
        console.log('User products:', products); // Логирование
    
        const productDetailsCollection = mongoDb.collection('products');
    
        // Итоговый массив для продуктов с добавленной информацией
        const enrichedProducts = [];
    
        for (const userProduct of products) {
            // Получаем _id продукта из userproduct
            const { orderId, key } = userProduct;
    
            console.log('Processing user product:', userProduct); // Логирование
    
            // Находим соответствующий продукт в коллекции products
            const productDetails = await productDetailsCollection.findOne({ _id: orderId });
    
            console.log('Found product details:', productDetails); // Логирование
    
            if (productDetails) {
                // Добавляем информацию о продукте в итоговый массив
                enrichedProducts.push({
                    ...productDetails,
                    ...(key && { key }), // Добавляем key, если он существует
                });
            }
        }
    
        console.log('Enriched products:', enrichedProducts); // Логирование
    
        return new Response(JSON.stringify(enrichedProducts));
    } else {
        console.log('Invalid code'); // Логирование
    }
    
    

    return new Response(false);
}
