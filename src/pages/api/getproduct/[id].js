import { connectToMongo } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET({ params }) {
    const { id } = params;
    const { db } = await connectToMongo();

    const products = db.collection('products');
    const product = await products.findOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify(product));
}