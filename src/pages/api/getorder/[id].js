import { MongoClient, ObjectId } from 'mongodb';

export async function GET({ params, request }) {
  const id = params.id;

  const uri = import.meta.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db('vndteam');
    const orders = db.collection('orders');

    const order = await orders.findOne({ _id: new ObjectId(id) });
    if (order) {
      return new Response(JSON.stringify(order));
    } else {
      return new Response('Not found', { status: 404 });
    }
  } catch (error) {
    return new Response('Not found', { status: 404 });
  } finally {
    await client.close();
  }
};

