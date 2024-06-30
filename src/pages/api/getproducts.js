import { connectToMongo } from '../../lib/mongodb';

export async function GET() {
  const { db } = await connectToMongo();
  const productsCollection = db.collection('products');
  const products = await productsCollection.find().toArray();

  return new Response(JSON.stringify(products), {});
}