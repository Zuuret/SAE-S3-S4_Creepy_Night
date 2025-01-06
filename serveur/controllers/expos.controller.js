const { v4 : uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const expoService = require("../services/expos.services.pg");
const {FALSE} = require("pg-format/lib/reserved");

exports.saveExpo = async (req,res) => {
    const createur = req.body.createur;
    const email = req.body.email;
    const date_crea = req.body.date_crea;
    const description = req.body.description;
    const image = req.body.image;
    const resultat = await expoService.insertExpo(createur, email, date_crea, description, image);
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("INSERTION AVEC SUCCES");
}

exports.getExpos = async (req, res) => {
    const expos = await expoService.getExpos();
    if (!expos) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: expos });
};

exports.getExpoById = async (req, res) => {
    const id = req.params.id;
    //console.log(uuid)
    try {
        const expos = await expoService.getExpos();
        if (!expos) {
            return res.status(500).json({ error: 'ERREUR INTERNE' });
        }
        //console.log(expos)
        const expo = expos.find(expo => expo.id == id);
        //console.log(expo)
        if (!expo) {
            return res.status(404).json({ error: 'Expo non trouvé' });
        }
        return res.status(200).json({ data: expo });
    } catch (error) {
        console.error('Erreur lors de la récupération du expo :', error);
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
};

exports.updateExpo = async (req,res) => {
    const id = req.body.id
    const createur = req.body.createur;
    const email = req.body.email;
    const date_crea = req.body.date_crea;
    const description = req.body.description;
    const image = req.body.image;
    const resultat = await expoService.updateExpo(id, createur, email, date_crea, description, image);
    if(resultat){
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("MODIFICATION ENREGISTREE");
};

exports.deleteExpo = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await expoService.deleteExpo(id);

        if (result) {
            return res.status(200).json({ message: 'Expo supprimé avec succès' });
        } else {
            return res.status(404).json({ message: 'Expo non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du expo:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
/*exports.deleteUser = async (req,res) => {
    let uuid = req.query.uuid;
    if(!uuid){
        return res.status(400).send("UUID Nulle!!!!");
    }
    userService.deleteUser(uuid,(error,data)=>{
        if(error){
            if(error == "Utilisateur introuvable"){
                return res.status(400).send(error);
            }else{
                return res.status(500).send("Erreur interne");
            }
        }
        return res.status(200).send(data);
    })
}*/