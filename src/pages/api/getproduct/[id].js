import { MongoClient, ObjectId } from 'mongodb';

export async function GET({ params, request }) {
    const id = params.id;
    const uri = import.meta.env.MONGODB_URI;
    const client = new MongoClient(uri);

    await client.connect();
    const db = client.db('vndteam');
    const products = db.collection('products');
    const product = await products.findOne({ _id: new ObjectId(id) });
    await client.close();

    return new Response(JSON.stringify(product));

}