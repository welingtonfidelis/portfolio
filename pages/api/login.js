const bcrypt = require('bcrypt');
const db = require('../../database/connection');
const authtentication = require('../../services/authentication');

export default async (req, res) => {
    try {
        const { user, password: passwordUser } = req.body;

        const userModel = await db.connectCollection('users');

        let foundUser = (await userModel.findOne({ user }));

        //Garantindo que no primeiro login um usuário admin será inserido
        if (!foundUser && !(await userModel.countDocuments())) {
            const defaultName = process.env.DEFAULT_USER_NAME;
            const defaultUser = process.env.DEFAULT_USER_USER;
            const defaultPassword = process.env.DEFAULT_USER_PASSWORD;

            const { insertedId } = await userModel.insertOne({
                name: defaultName,
                user: defaultUser,
                password: defaultPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            foundUser = { _id: insertedId, name: defaultName, password: defaultPassword }
        }

        if(!foundUser) createError(401, 'Invalid user or password');

        const { _id: id, name, password } = foundUser;
        const isValid = bcrypt.compareSync(passwordUser, password);

        if (!isValid) createError(401, 'Invalid user or password');

        const authorization = authtentication.createToken({ id, name });
        
        res.json({ ok: true, name, authorization });
    }
    catch (error) {
        const code = error.code || 500;
        const message = error.message || 'Internal server error';

        res.status(code).json({ ok: false, message });
    }
}

const createError = (code, message) => {
    throw {
        code,
        message
    }
}