const db = require('../../../database/connection');
const authtentication = require('../services/authentication');
const upload = require('../services/upload');
const utils = require('../utils');

export default async (req, res) => {
    try {
        authtentication.validateToken(req);

        const { name, description, publishedIn, repository, images } = req.body;
        
        const imagesUrl = []
        if(images && images.length) {
            for(const image of images) {
                const uploadedImage = await upload.uploadImage(image, name);
                
                if(uploadedImage) imagesUrl.push(uploadedImage.Location);
            }
        }

        const projectModel = await db.connectCollection('projects');

        const { insertedId: _id} = await projectModel.insertOne(
            { 
                name, description, publishedIn, repository, imagesUrl, 
                createdAt: new Date(), updatedAt: new Date() 
            }
        );

        res.json({ ok: true, _id });
    }
    catch (error) {
        utils.errorResponse(res, error);
    }
}