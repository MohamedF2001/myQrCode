/* 
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
            let finalResult = {evenement:qr.evenement,numTicket:qr.numTicket,
                nom:qr.nom,prenom:qr.prenom,telephone:qr.telephone,ticket:qr.monstatut,permis:qr.permis};
            const result = await QrCode.updateOne(
                {qrCode : req.params.qrCode},
                {
                    $set : {
                        monstatut : "UTILISE"
                    }
                },
                )
                console.log('success', result)
            res.json({message: "Statut changé!", result, finalResult });
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
                if (qr) {
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
                }
                else {
                    console.log("erreur "+qr)
                    res.json({})
                }
        }
        )
    },
    permission: function async (req, res) {
        QrCode.findOne({
            qrCode:req.query.qrCode
        }, function(err, qr) {
            if (err) throw res.json({msg:"une 1 erreur s\'est produite"})
                if (qr) {
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
                }
                else {
                    console.log("erreur "+qr)
                    res.json({})
                }
        }
        )
    }
}

module.exports = functions */

const QrCode = require('../models/qr');
const config = require('../config/dbconfig');

const functions = {
    addNewQr: async (req, res) => {
        const { qrCode, evenement, nom, prenom, telephone, numTicket } = req.body;
        
        if (!qrCode || !evenement || !nom || !prenom || !telephone || !numTicket) {
            return res.status(400).json({ success: false, msg: 'Tous les champs sont requis', data: null });
        }
        
        try {
            const newQrCode = new QrCode({
                qrCode,
                evenement,
                numTicket,
                nom,
                prenom,
                telephone,
                monstatut: "INITIAL",
                permis: false
            });
            
            const savedQrCode = await newQrCode.save();
            res.status(201).json({ success: true, msg: 'Enregistré avec succès', data: savedQrCode });
        } catch (err) {
            res.status(500).json({ success: false, msg: 'Enregistrement échoué', data: null, error: err.message });
        }
    },

    mafonction: async (req, res) => {
        try {
            const result = await QrCode.findOneAndUpdate(
                { qrCode: req.params.qrCode },
                { $set: { monstatut: "UTILISE" } },
                { new: true }
            );
            
            if (!result) {
                return res.status(404).json({ success: false, msg: 'QR Code non trouvé', data: null });
            }
            
            res.json({ success: true, msg: "Statut changé!", data: result });
        } catch (err) {
            res.status(500).json({ success: false, msg: 'Erreur serveur', data: null, error: err.message });
        }
    },

    mafonction2: async (req, res) => {
        try {
            const qr = await QrCode.findOne({ qrCode: req.query.qrCode });
            
            if (!qr) {
                return res.status(404).json({ success: false, msg: 'QR Code non trouvé', data: null });
            }
            
            if (qr.monstatut === "INITIAL") {
                qr.monstatut = "UTILISE";
                await qr.save();
            }
            
            res.json({ success: true, msg: "Données récupérées avec succès", data: qr });
        } catch (err) {
            res.status(500).json({ success: false, msg: 'Erreur serveur', data: null, error: err.message });
        }
    },

    /* permission: async (req, res) => {
        try {
            const qr = await QrCode.findOne({ qrCode: req.params.qrCode });
            console.log(qr);
            if (!qr) {
                return res.status(404).json({ success: false, msg: 'QR Code non trouvé', data: null });
            }
            
            if (!qr.permis) {
                qr.permis = true;
                await qr.save();
            }
            
            res.json({ success: true, msg: "Permission mise à jour", data: qr });
        } catch (err) {
            res.status(500).json({ success: false, msg: 'Erreur serveur', data: null, error: err.message });
        }
    }, */
    permission: async (req, res) => {
        try {
            const qr = await QrCode.findOne({ qrCode: req.params.qrCode });
            
            if (!qr) {
                return res.status(404).json({ success: false, msg: 'QR Code non trouvé', data: null });
            }
            
            qr.permis = !qr.permis; // Inverser la valeur de permis
            await qr.save();
            
            res.json({ success: true, msg: "Permission mise à jour", data: qr });
        } catch (err) {
            res.status(500).json({ success: false, msg: 'Erreur serveur', data: null, error: err.message });
        }
    },

    tousqr: async (req, res) => {
        try {
            const qrcodes = await QrCode.find();
            res.json({ success: true, data: qrcodes });
        } catch (err) {
            res.status(500).json({ success: false, msg: 'Erreur serveur', error: err.message });
        }
    }
    
};

module.exports = functions;
