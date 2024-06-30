
import { MongoClient } from 'mongodb';

const uri = import.meta.env.MONGODB_URI;
let mongoClient;
let mongoDb;

export async function connectToMongo() {
    if (!mongoClient) {
        mongoClient = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await mongoClient.connect();
        mongoDb = mongoClient.db('vndteam');
        console.log('Connected to MongoDB');
    }
    return { client: mongoClient, db: mongoDb };
}
