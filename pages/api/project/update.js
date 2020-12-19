import { ObjectID } from 'mongodb';

const db = require('../../../database/connection');
const authtentication = require('../services/authentication');
const upload = require('../services/upload');
const utils = require('../utils');

export default async (req, res) => {
    try {
        authtentication.validateToken(req);

        const {
            name, description, publishedIn, repository,
            images = [], removeImages = []
        } = req.body;
        const { _id } = req.query;

        const projectModel = await db.connectCollection('projects');

        let { imagesUrl } = await projectModel.findOne({ _id: ObjectID(_id) });

        if (removeImages && removeImages.length) {
            for (const image of removeImages) {
                const url = (image.split('/images/'))[1]
                
                await upload.deleteFile(`images/${url}`);

                imagesUrl = imagesUrl.filter(item => item !== image);
            }
        }

        if (images && images.length) {
            for (const image of images) {
                const uploadedImage = await upload.uploadImage(image, name);

                if (uploadedImage) imagesUrl.push(uploadedImage.Location);
            }
        }

        await projectModel.updateOne(
            { _id: ObjectID(_id) },
            {
                $set: {
                    name, description, publishedIn,
                    repository, imagesUrl, updatedAt: new Date()
                }
            }
        );

        res.json({ ok: true });
    }
    catch (error) {
        utils.errorResponse(res, error);
    }
}