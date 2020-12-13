const db = require('../../../database/connection');
const utils = require('../utils');

export default async (req, res) => {
    try {
        const skillModel = await db.connectCollection('skills');
        const { order = 'rating', by = -1 } = req.query;

        const skills = await skillModel.find().sort({[order]: parseInt(by)}).toArray();

        res.json({ ok: true, skills });
    }
    catch (error) {
        utils.errorResponse(res, error);
    }
}