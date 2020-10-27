import { ObjectID } from 'mongodb';

const db = require('../../database/connection');
const authtentication = require('../../services/authentication');

export default async (req, res) => {
    try {
        authtentication.validateToken(req);

        const { _id } = req.query;
        
        const skillModel = await db.connectCollection('skills');
        
        await skillModel.deleteOne(
            { _id: ObjectID(_id) }
            );

        res.json({ ok: true });
    }
    catch (error) {
        console.log('--->', error);
        const code = error.code || 500;
        const message = error.message || 'Internal server error';

        res.status(code).json({ ok: false, message });
    }
}