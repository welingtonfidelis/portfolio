const db = require('../../database/connection');
const utils = require('./utils');

export default async (req, res) => {
    try {
        const { ip } = req.body;

        const collection = (await db.connectMongo()).collection('visits');
    
        await collection.insertOne({
            ip, visitAt: new Date()
        });
    
        return res.status(201).json({ ok: true });

    } catch (error) {
        utils.errorResponse(res, error);
    }
}