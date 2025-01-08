const { v4 : uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const prestataireService = require("../services/prestataires.services.pg");
const {FALSE} = require("pg-format/lib/reserved");

exports.savePrestataire = async (req,res) => {
    const uuid = uuidv4()
    const societe = req.body.societe;
    const adresse = req.body.adresse;
    const email = req.body.email;
    const password = req.body.password;
    const resultat = await prestataireService.insertPrestataire(societe, adresse, email, password);
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("INSERTION AVEC SUCCES");
}

exports.getPrestataires = async (req, res) => {
    const prestataires = await prestataireService.getPrestataires();
    if (!prestataires) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: prestataires });
};

exports.getPrestataireById = async (req, res) => {
    const uuid = req.params.uuid;
    //console.log(uuid)
    try {
        const prestataires = await prestataireService.getPrestataires();
        if (!prestataires) {
            return res.status(500).json({ error: 'ERREUR INTERNE' });
        }
        //console.log(prestataires)
        const prestataire = prestataires.find(prestataire => prestataire.id == uuid);
        //console.log(prestataire)
        if (!prestataire) {
            return res.status(404).json({ error: 'Prestataire non trouvé' });
        }
        return res.status(200).json({ data: prestataire });
    } catch (error) {
        console.error('Erreur lors de la récupération du prestataire :', error);
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
};

exports.updatePrestataire = async (req,res) => {
    
    const uuid = req.params.uuid;
    const societe = req.body.societe;
    const adresse = req.body.adresse;
    const email = req.body.email;
    const password = req.body.password;
    const resultat = await prestataireService.updatePrestataire(uuid,societe, adresse, email, password);
    if(resultat){
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("MODIFICATION ENREGISTREE");
};

exports.deletePrestataire = async (req, res) => {
    const { uuid } = req.params;

    try {
        const result = await prestataireService.deletePrestataire(uuid);

        if (!result) {
            return res.status(200).json({ message: 'Prestataire supprimé avec succès' });
        } else {
            return res.status(404).json({ message: 'Prestataire non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du prestataire:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
