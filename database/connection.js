import { MongoClient } from 'mongodb';
import url from 'url';

let cachedDb = null;

const methods = {
    async connectMongo() {
        if (cachedDb) return cachedDb;

        const uri = process.env.MONGODB_URI;
        console.log('Cone', uri);
        const client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const dbName = url.parse(uri).pathname.substr(1);
        const db = client.db(dbName);

        cachedDb = db;

        return db
    },
    async connectCollection(collection) {
        return (await this.connectMongo()).collection(collection);
    }
}

module.exports = methods;