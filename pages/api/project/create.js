const db = require('../../../database/connection');
const authtentication = require('../../../services/authentication');
const upload = require('../../../services/upload');

export default async (req, res) => {
    try {
        // authtentication.validateToken(req);

        const { name, description, publishedIn, repository, images } = req.body;
        
        const imagesUrl = []
        if(images && images.length) {
            for(const image of images) {
                const uploadedImage = await upload.uploadImage(image, name);
                
                if(uploadedImage) imagesUrl.push(uploadedImage.Location);
            }
        }
        console.log('===>', name, description, publishedIn, repository, imagesUrl);
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
        console.log('ERROR ===>', error);

        const code = error.code || 500;
        const message = error.message || 'Internal server error';

        res.status(code).json({ ok: false, message });
    }
}