const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');

const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_DEFAULT_REGION;

const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    region
});

const acceptablesImgType = ['jpeg', 'png', 'gif']

module.exports = {
    async uploadImage(file, folderName, fileName = null) {
        const base64Data = new Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        const type = file.split(';')[0].split('/')[1];

        validateTypeFiles(type, acceptablesImgType);

        fileName = fileName || `${uuidv4()}.${type}`
        fileName = slugify(fileName, {
            replacement: '_',
            lower: true,    
        });

        folderName = slugify(folderName, {
            replacement: '_',
            lower: true,    
        });

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
            .catch(err => {
                console.warn('UPLOAD IMAGE FAILED', err);
                throw err;
            });
    },

    async deleteFile(fileUrl) {
        const params = {
            Bucket: bucketName,
            Key: fileUrl
        }

        return s3.deleteObject(params).promise()
            .then(data => {
                return data;
            })
            .catch(err => {
                console.warn('DELETE FILE FAILED', err);
                throw err;
            });
    }
}

const validateTypeFiles = (type, acceptables = []) => {
    if (!acceptables.includes(type)) {
        throw {
            code: 400,
            message: `${type} is not accept file type. Acceptables: ${acceptables}`
        }
    }
}