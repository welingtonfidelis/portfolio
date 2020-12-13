const db = require('../../../database/connection');

export default async (req, res) => {
    try {
        const projectModel = await db.connectCollection('projects');
        // const { order = 'createdAt', by = -1 } = req.query;

        const projects = await projectModel.find().toArray()
        // .sort({[order]: parseInt(by)}).toArray();

        res.json({ ok: true, projects });
    }
    catch (error) {
        console.log('ERROR ===>', error);

        const code = error.code || 500;
        const message = error.message || 'Internal server error';

        res.status(code).json({ ok: false, message });
    }
}