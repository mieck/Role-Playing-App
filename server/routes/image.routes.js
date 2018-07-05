module.exports = function (app) {
    var Image = require('../controllers/image.controller');
    //const upload = require('../config/image.config.js');

    var multer = require('multer');
    const UPLOAD_PATH = require('../config/ImageFolder.config');

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

    app.post('/new_image_charcater',upload.single('image'), Image.new_character_image);

//character Update
    //app.post('/get_last_Avatar', Image.update_character);

    //app.post('/get_character_image', Image.findOneCharacter);

};
