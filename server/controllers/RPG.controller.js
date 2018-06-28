const Spiel = require('../models/RPG.model.js');
const Spieler = require('./Spieler.controller');

exports.newSpiel = (req,res)=>{

        var newspiel = {
            spieltitle:req.body.spieltitle,
            spielbeschreibung:req.body.spielbeschreibung,
            admin:req.body.admin,
            spielgenre:req.body.spielgenre
        };
        var SpielerId = req.body.admin;

        var spiel = new Spiel(newspiel);
        spiel.save()
            .then(spiel => {
                Spieler.AddSpielId(SpielerId);
                // if (result._id == null){
                //     console.log("fehler beim Update Spieler Character!");
                // }
                // else {
                //     res.status(200).send(result);
                // }
                res.status(200).send(spiel);
            }).catch(err =>{
            console.log("fehler beim Insert Character!");
            res.status(500).send({
                message:err.message
            })
        })

};

exports.updateSpiel = (req,res) =>{
    //let spielerId = req.body.spielerId;
    console.log("update Spiel!");
    var new_value = {
        spieltitle:req.body.spieltitle,
        spielbeschreibung:req.body.spielbeschreibung,
        admin:req.body.admin,
        spielgenre:req.body.spielgenre
    };

    Character.update({_id:req.body.spielId},  { $set: { field : new_value} })
        .then( spiel =>{
            res.status(200).send(spiel);
        }).catch(err =>{
        res.status(500).send(err.message);
    })

};


exports.findOneSpielById = (req,res)=>{

    Spiel.findById(req.body.id)
        .then(Spiel =>{
            res.status(200).send(Spiel);
        }).catch(err =>{
            res.status(500).send(err.message);
    })
};

exports.findAll = (req,res)=>{
    console.log("Spiel");
    Spiel.find()
        .then(Spiele =>{
            res.send(Spiele);
        }).catch(err =>{
        res.status(500).send({
            message:err.message
        })
    })
};
