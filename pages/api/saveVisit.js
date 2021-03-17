const db = require('../../database/connection');
const utils = require('./utils');

export default async (req, res) => {
    try {
        const data = req.body;
        const visitAt = new Date();

        const collection = (await db.connectMongo()).collection('visits');
    
        await collection.insertOne({
            ...data, visitAt
        });
    
        return res.status(201).json({ ok: true });

    } catch (error) {
        utils.errorResponse(res, error);
    }
}