const db = require('../../../database/connection');
const utils = require('../utils');

export default async (req, res) => {
    try {
        const projectModel = await db.connectCollection('projects');
        const { order = 'updatedAt', by = -1 } = req.query;

        const projects = await projectModel.find()
        .sort({[order]: parseInt(by)}).toArray();

        res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');
        
        res.json({ ok: true, projects });
    }
    catch (error) {
        utils.errorResponse(res, error);
    }
}