import { ObjectID } from 'mongodb';

const db = require('../../../database/connection');
const authtentication = require('../services/authentication');
const utils = require('../utils');

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
        utils.errorResponse(res, error);
    }
}