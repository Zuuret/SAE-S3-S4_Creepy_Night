const { v4 : uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const prestationService = require("../services/prestations.services.pg");
const {FALSE} = require("pg-format/lib/reserved");

exports.savePrestation = async (req,res) => {
    const nom = req.body.artiste;
    const prix = req.body.nationalite;
    const description = req.body.date;
    const image = req.body.heure;
    const zone_id = 1;
    const resultat = await prestationService.insertPrestation(nom, prix, description, image, zone_id);
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("INSERTION AVEC SUCCES");
}

exports.getPrestations = async (req, res) => {
    const prestations = await prestationService.getPrestations();
    if (!prestations) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: prestations });
};

exports.getPrestationById = async (req, res) => {
    const id = req.params.id;
    //console.log(uuid)
    try {
        const prestations = await prestationService.getPrestations();
        if (!prestations) {
            return res.status(500).json({ error: 'ERREUR INTERNE' });
        }
        //console.log(prestations)
        const prestation = prestations.find(prestation => prestation.id == id);
        //console.log(prestation)
        if (!prestation) {
            return res.status(404).json({ error: 'Prestation non trouvé' });
        }
        return res.status(200).json({ data: prestation });
    } catch (error) {
        console.error('Erreur lors de la récupération du Prestation :', error);
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
};

exports.updatePrestation = async (req,res) => {
    
    const id = req.params.id;
    const nom = req.body.artiste;
    const prix = req.body.nationalite;
    const description = req.body.date;
    const image = req.body.heure;
    const zone_id = 1;
    const resultat = await prestationService.updatePrestation(id,nom, prix, description, image, zone_id);
    if(resultat){
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("MODIFICATION ENREGISTREE");
};

exports.deletePrestation = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await prestationService.deletePrestation(id);

        if (!result) {
            return res.status(200).json({ message: 'Prestation supprimé avec succès' });
        } else {
            return res.status(404).json({ message: 'Prestation non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du prestation:', error);
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