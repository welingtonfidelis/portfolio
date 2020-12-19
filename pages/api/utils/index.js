module.exports = {
    errorResponse(res, error) {
        console.log('ERROR ===> \n', error, '\n <=== ERROR');

        const code = error.code || 500;
        const message = error.message || 'Internal server error'

        res.status(code).json({ ok: false, message });
    },

    createError(code, message) {
        throw {
            code,
            message
        }
    }
}