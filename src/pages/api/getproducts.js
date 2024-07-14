import { connectToMongo } from '../../lib/mongodb';

export async function GET() {
  const { db } = await connectToMongo();
  if (!db) {
    throw new Error('Failed to connect to the database');
  }
  const productsCollection = db.collection('products');
  const products = await productsCollection.find().toArray();
  for (const product of products) {
    if (product.download_url) {
      delete product.download_url;
    }
  }

  return new Response(JSON.stringify(products), {});
}