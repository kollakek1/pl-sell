import { ObjectId } from 'mongodb';
import { connectToMongo } from '../../../lib/mongodb';

export async function GET({ params, request }) {
  const id = params.id;

  try {
    const { db } = await connectToMongo();
    const orders = db.collection('orders');

    const order = await orders.findOne({ _id: new ObjectId(id) });
    if (order) {
      return new Response(JSON.stringify(order));
    } else {
      return new Response('Not found', { status: 404 });
    }
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}