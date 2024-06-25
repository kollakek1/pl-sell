import { MongoClient } from 'mongodb';

export async function GET() {
  const uri = import.meta.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db('vndteam');
    const productsCollection = db.collection('products');
    const products = await productsCollection.find().toArray();

    return new Response(JSON.stringify(products));
  } finally {
    await client.close();
  }
}

