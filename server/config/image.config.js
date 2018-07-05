var multer = require('multer');
const UPLOAD_PATH = require('./config/ImageFolder.config.js');

// Multer Settings for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });

module.exports= upload;

