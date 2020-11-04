const db = require('../../../database/connection');
const authtentication = require('../../../services/authentication');

export default async (req, res) => {
    try {
        authtentication.validateToken(req);

        const { category, name, rating } = req.body;

        const skillModel = await db.connectCollection('skills');

        const { insertedId: _id} = await skillModel.insertOne(
            { category, name, rating, createdAt: new Date(), updatedAt: new Date() }
        );

        res.json({ ok: true, _id });
    }
    catch (error) {
        const code = error.code || 500;
        const message = error.message || 'Internal server error';

        res.status(code).json({ ok: false, message });
    }
}