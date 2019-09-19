const multer = require('multer');
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({ // save image to disk
        destination: path.resolve(__dirname, '..', '..', 'uploads' ), // directory to save image
        filename: function (req, file, cb){
            cb(null, file.originalname);
        }
    })
}