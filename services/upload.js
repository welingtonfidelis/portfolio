const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_DEFAULT_REGION;

const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    region
});

module.exports = {
    async uploadImage (file, folderName, fileName = null) {
        const base64Data = new Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        // Getting the file type, ie: jpeg, png or gif
        const type = file.split(';')[0].split('/')[1];
        fileName = fileName || `${uuidv4()}.${type}`

        const params = {
            Bucket: `${bucketName}/images/${folderName}`,
            Key: fileName,
            Body: base64Data,
            ACL: "public-read",
            ContentEncoding: 'base64', // required
            ContentType: `image/${type}` // required. Notice the back ticks
        }
    
        return s3.upload(params).promise()
        .then(data => {
            return data;
        })
        .catch(err =>{
            console.warn('UPLOAD IMAGE FAILED', err);
            throw err;
        });
    }
}