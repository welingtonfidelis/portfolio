const db = require('../../database/connection');

export default async (req, res) => {
    try {
        const { ip } = req.body;

        const collection = (await db.connectMongo()).collection('visits');
    
        await collection.insertOne({
            ip, visitAt: new Date()
        });
    
        return res.status(201).json({ ok: true });

    } catch (error) {
        console.log('ERROR ===>', error);

        const code = error.code || 500;
        const message = error.message || 'Internal server error';

        res.status(code).json({ ok: false, message });
    }
}