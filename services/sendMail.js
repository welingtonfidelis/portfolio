import api from './api';

module.exports = async (mailFrom, mailTo, message, subject, mailCc = '') => {
    const { data } = await api.post(`/sendmail/sendgrid`,
        {
            mailFrom,
            mailTo,
            message,
            subject,
            mailCc
        });
        
    return data;
}