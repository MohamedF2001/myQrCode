
var QrCode = require('../models/qr')
var config = require('../config/dbconfig')

var functions = {
    addNewQr: async function (req, res) {
        if (!req.body.qrCode || !req.body.evenement || !req.body.nom ||
            !req.body.prenom || !req.body.telephone || !req.body.numTicket) {
            return res.json({ success: false, msg: 'Entrez tous les champs' });
        }
    
        try {
            const newQrCode = new QrCode({
                qrCode: req.body.qrCode,
                evenement: req.body.evenement,
                numTicket: req.body.numTicket,
                nom: req.body.nom,
                prenom: req.body.prenom,
                telephone: req.body.telephone,
                monstatut: "INITIAL",
                permis: false
            });
    
            const savedQrCode = await newQrCode.save();
            res.json({ success: true, msg: 'Enregistré avec succès', data: savedQrCode });
        } catch (err) {
            res.json({ success: false, msg: 'Enregistrement échoué', error: err.message });
        }
    },
    

    mafonction: async function (req,res) {
        try {
            const result = await QrCode.updateOne(
                {qrCode : req.params.qrCode},
                {
                    $set : {
                        monstatut : "UTILISE"
                    }
                },
                )
                console.log('success', result)
            res.json({message: "Statut changé!", result });
            }
            catch (err) {
           console.log('error', err)
           res.status(500).json({error:'There was a Server Side Error!'})
        }
    }, 
    mafonction2: function async (req, res) {
        QrCode.findOne({
            qrCode:req.query.qrCode
        }, function(err, qr) {
            if (err) throw res.json({msg:"une 1 erreur s\'est produite"})
                if (qr  /* qr.monstatut=="active" */) {
                    console.log("succes "+qr)
                    let finalResult = {evenement:qr.evenement,numTicket:qr.numTicket,
                        nom:qr.nom,prenom:qr.prenom,telephone:qr.telephone,ticket:qr.monstatut};
                    if(qr.monstatut && qr.monstatut === 'INITIAL'){
                        QrCode.updateOne(
                            {qrCode : req.query.qrCode},
                            {
                                $set : {
                                    monstatut : "UTILISE"
                                }
                            },
                            )
                        .then(()=>{console.log('update success')}).catch((e)=>{console.log('error' + e)});
                    }
                    res.send(finalResult)
                    //res.json({nom:qr.nom,prenom:qr.prenom,ticket:qr.monstatut})
                }
                else {
                    console.log("erreur "+qr)
                    res.json({})
                    //res.json({nom:qr.nom,prenom:qr.prenom,ticket:qr.monstatut})
                }
        }
        )
        //console.log(QrCode)
    },
    permission: function async (req, res) {
        QrCode.findOne({
            qrCode:req.query.qrCode
        }, function(err, qr) {
            if (err) throw res.json({msg:"une 1 erreur s\'est produite"})
                if (qr  /* qr.monstatut=="active" */) {
                    console.log("succes "+qr)
                    let finalResult = {evenement:qr.evenement,numTicket:qr.numTicket,
                        nom:qr.nom,prenom:qr.prenom,telephone:qr.telephone,ticket:qr.monstatut,permis:qr.permis};
                    if(qr.permis == false){
                        QrCode.updateOne(
                            {qrCode : req.query.qrCode},
                            {
                                $set : {
                                    permis : true
                                }
                            },
                            )
                        .then(()=>{console.log('update success')}).catch((e)=>{console.log('error' + e)});
                    }
                    res.send(finalResult)
                    //res.json({nom:qr.nom,prenom:qr.prenom,ticket:qr.monstatut})
                }
                else {
                    console.log("erreur "+qr)
                    res.json({})
                    //res.json({nom:qr.nom,prenom:qr.prenom,ticket:qr.monstatut})
                }
        }
        )
        //console.log(QrCode)
    }
}

module.exports = functions