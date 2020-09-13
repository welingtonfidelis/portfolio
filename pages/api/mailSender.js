const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

export default async (req, res) => {
    try {
        const { from, to, subject, html, cc = '' } = req.body;
    
        sgMail.setApiKey(SENDGRID_API_KEY);
        await sgMail.send({
            to,
            from,
            cc,
            subject,
            html,
        });

        res.json({ ok: true });
        
    } catch (error) {
        const code = error.code || 500;
        const message = error.message || 'Internal server error';

        res.status(code).json({ ok: false, message });
    }
}