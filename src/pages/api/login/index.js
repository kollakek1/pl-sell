import { MongoClient } from 'mongodb';
import { createClient } from 'redis';

export async function POST({ request }) {

    const client = createClient({
        password: import.meta.env.REDIS_PASSWORD,
        socket: {
            host: import.meta.env.REDIS_HOST,
            port: 11772
        }
    });

    const uri = import.meta.env.MONGODB_URI;
    const mongoClient = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();

    const body = await request.text();
    const { userEmail, userCode } = JSON.parse(body);

    const code = await client.get(userEmail);
    await client.quit();

    if (userCode === code) {
        await client.connect();
        const db = mongoClient.db('vndteam');
        const productsCollection = db.collection('orders');
        const products = await productsCollection.find({email: userEmail}).toArray();
    
        return new Response(JSON.stringify(products));
    }

    return new Response(false)

}