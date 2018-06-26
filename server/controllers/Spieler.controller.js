const Spieler = require('../models/Spieler.model.js');


exports.findAll = (req,res)=>{
    console.log("spieler");
    Spieler.find()
        .then(Spielers =>{
            res.send(Spielers);
        }).catch(err =>{
            res.status(500).send({
                message:err.message
            })
    })
};

exports.New_Spieler = (req,res)=>{
    console.log("register!");
    var items = {
        spielername :req.body.spielername,
        spielerpasswort : req.body.spielerpasswort,
        spieleremail : req.body.spieleremail,
    };
    var user = new Spieler(items);
    user.save()
        .then(user => {
            //console.log(user);
            res.status(200).send(user);
        }).catch(err =>{
            if(err.code==11000) {
                res.status(500).send("Name doppelt")
            }else{
                res.status(500).send({
                    message: err.message
                })
            }
    })
};

exports.login = function(req,res) {
    console.log("login!");
    Spieler.findOne({"spielername": req.body.spielername}, function (err,user) {
        if(user == null){
            console.log("Ein Fehler ist aufgetreten.");
            //console(err);
            res.send({"message":"Nutzername existiert nicht!"});
        }else if (user.spielerpasswort == req.body.spielerpasswort){
            console.log("Perfekt.");
            console.log(user);
            res.send(user);

        }else {
            res.send({"message": "Falsches Passwort!"})
        }
    })

};


exports.updateProfil = (req, res)=>{
    var newitems = {
        spielername :req.body.spielername,
        spielerpasswort : req.body.spielerpasswort,
        spieleremail : req.body.spieleremail,
    };
    Spieler.update({_id:req.body.spielerId},  { $set: { field : newitems} })
        .then( Spieler =>{
            res.status(200).send(Spieler);
        }).catch(err =>{
        res.status(500).send(err.message);
    })
};

//#############################################################################################
// Interne
//###############################################################################################
exports.findWithId = (SpielerId)=>{
    Spieler.findById(SpielerId)
        .then(Spieler =>{
            return(Spieler);
        }).catch(err =>{
        return 0;
    })
};

exports.AddCharacterId = (SpielerId, characterId)=>{
    Spieler.findByIdAndUpdate(SpielerId,  { $push: { Characters: characterId }})
        .then( Spieler =>{
            console.log("Spieler Update  Beim AddCharacterID");
            console.log(Spieler);
            console.log(Spieler.Characters);
            //return Spieler;
        }).catch(err =>{
            console.log("Fehler Beim AddCharacterID");
            return err.message;
    })
};

exports.AddSpielId = (SpielerId, spielId)=>{
    Spieler.update({_id:SpielerId},  { $push: { Spiels: spielId } })
        .then( Spieler =>{
            return Spieler;
        }).catch(err =>{
        return err.message;
    })
};
