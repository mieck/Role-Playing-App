module.exports = function (app) {
    var Image = require('../controllers/image.controller');
    //const upload = require('../config/image.config.js');
    var path = require('path');
    var multer = require('multer');
    const UPLOAD_PATH = require('../config/ImageFolder.config');

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const Imagemodel = require('../models/image.model');
    const Character = require('../controllers/Character.controller');
    const fs = require('fs');
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Multer Settings for file upload

    const storage = multer.diskStorage({
       /* destination: function (req, file, cb) {
            console.log('uploadpath:'+file.originalname);
            cb(null, UPLOAD_PATH)
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }*/

        destination:function(req, file, cb)
        {
           // console.log('uploadpath:'+file.originalname);

            var pathname = file.originalname.split('-');
           // console.log(file.originalname);
            var pathfile = pathname[0].replace('-','/');


            console.log(pathfile);

            cb(null,path.join(__dirname,UPLOAD_PATH ));

        },
        filename:function(req,file,cb)
        {
            //var pathname = file.originalname.split('-');
            //var filename = pathname[0]+ '-' + Date.now();
            var filename =file.originalname;
            console.log(filename);
            if(filename!=undefined)
                cb(null, filename);
        }

    });
    var upload = multer({ storage: storage });

    //app.post('/new_image_charcater',upload.single('profileImage'), Image.new_character_image);

    app.post('/new_image_charcater',upload.single('file'), (req, res)=>{

        console.log("new Image!");
    var newImage = {
        filename:  req.file.filename,
        destination:req.file.destination
    };

    var img = new Imagemodel(newImage);

    img.save()
        .then(new_image => {
            console.log(new_image);
            res.status(200).send(new_image);
        }).catch(err =>{
        console.log("fehler beim Insert Character!");
        res.status(500).send({
            message:err.message
        })
    })
    });
   // app.post('/new_image_charcater', Image.new_character_image);

//character Update
    //app.post('/get_last_Avatar', Image.update_character);

    //app.post('/get_character_image', Image.findOneCharacter);

};
