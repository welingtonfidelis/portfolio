import { ObjectID } from 'mongodb';

const db = require('../../../database/connection');
const authtentication = require('../services/authentication');
const utils = require('../utils');
const upload = require('../services/upload');

export default async (req, res) => {
    try {
        authtentication.validateToken(req);

        const { _id } = req.query;

        const projectModel = await db.connectCollection('projects');

        let { imagesUrl } = await projectModel.findOne({ _id: ObjectID(_id) });

        if (imagesUrl && imagesUrl.length) {
            for (const image of imagesUrl) {
                const url = (image.split('/images/'))[1]

                await upload.deleteFile(`images/${url}`);
            }
        }

        await projectModel.deleteOne(
            { _id: ObjectID(_id) }
        );

        res.json({ ok: true });
    }
    catch (error) {
        utils.errorResponse(res, error);
    }
}