const db = require('../../database/connection');;

export default async (req, res) => {
    const trx = await db.transaction();

    try {
        const { ip } = req.body;
    
        await trx('visits').insert({ ip, date: new Date() });

        await trx.commit();
        
        res.json({ ok: true });

    } catch (error) {
        await trx.rollback();
        
        const code = error.code || 500;
        const message = error.message || 'Internal server error';

        res.status(code).json({ ok: false, message });
    }
}