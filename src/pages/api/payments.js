import { connectToMongo } from '../../../lib/mongodb';

export async function POST({ request }) {
    const ip = request.headers.get('cf-connecting-ip');
    const allowedIps = [
        "185.71.76.0/27",
        "185.71.77.0/27",
        "77.75.153.0/25",
        "77.75.156.11",
        "77.75.156.35",
        "77.75.154.128/25",
        "2a02:5180::/32"
    ];
    if (!allowedIps.some(ipRange => isIPInRange(ip, ipRange))) {
        console.log(`Request from unauthorized IP ${ip}`);
        return new Response('Unauthorized', { status: 401 });
    }
    const { db: mongoDb } = await connectToMongo();
    const body = await request.json();

    const description = body.object.description;
    const [, orderId, email] = description.match(/Заказ (\w+) для (\w+@\w+\.\w+)/);
    
    console.log(`Order ${orderId} for ${email} from ${ip}`);

    return new Response('OK');
}