// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');
 
// Your Google Cloud Platform project ID
const projectId = 'ariefmanda-195202';
 
// Creates a client
const storage = new Storage({
  projectId: projectId,
  keyFilename: 'key.json'
});

const CLOUD_BUCKET = 'bucket-img'

// The name for the new bucket
const bucket = storage.bucket(CLOUD_BUCKET);
 
const setUrl = (file) => {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${file}`
}

const uploadGCS = (req, res, next) => {
    if(!req.file){
        return next()
    }
    console.log('ini upload gcs');
    const gcsfinal = Date.now() + req.file.originalname
    const file = bucket.file(gcsfinal)
    
    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    })
    
    stream.on('error', (err) => {
        req.file.cloudStorageError = err
        next(err)
    })

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsfinal
        file.makePublic()
        .then(() => {
            req.file.cloudStoragePublicUrl = setUrl(gcsfinal)
            next()
        })
    })

    stream.end(req.file.buffer)
}

const Multer = require('multer'),
      multer = Multer({
          storage: Multer.MemoryStorage,
          limits: {
              fileSize: 10 * 1024 * 1024
          }
      })
      
module.exports = {
    setUrl,
    uploadGCS,
    multer
}