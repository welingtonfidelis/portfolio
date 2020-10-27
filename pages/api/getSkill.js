const db = require('../../database/connection');

export default async (req, res) => {
    try {
        const skillModel = await db.connectCollection('skills');

        const skills = await skillModel.find().sort({'rating': -1}).toArray();

        res.json({ ok: true, skills });
    }
    catch (error) {
        const code = error.code || 500;
        const message = error.message || 'Internal server error';

        res.status(code).json({ ok: false, message });
    }
}