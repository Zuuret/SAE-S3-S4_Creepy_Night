const { v4 : uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const demandesPrestatairesService = require("../services/demandesPrestataires.services.pg");
const {FALSE} = require("pg-format/lib/reserved");

exports.saveDemandePrestataire = async (req,res) => {
    const uuid = uuidv4()
    const societe = req.body.societe;
    const adresse = req.body.adresse;
    const email = req.body.email;
    const statut = req.body.statut;
    const password = req.body.password;
    const resultat = await demandesPrestatairesService.insertDemandePrestataire(uuid, societe, adresse, email, statut, password);
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("INSERTION AVEC SUCCES");
}

exports.getDemandesPrestataires = async (req, res) => {
    const demandesPrestataires = await demandesPrestatairesService.getDemandesPrestataires();
    if (!demandesPrestataires) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: demandesPrestataires });
};

exports.getDemandePrestataireById = async (req, res) => {
    const uuid = req.params.uuid;
    //console.log(uuid)
    try {
        const demandesPrestataires = await demandesPrestatairesService.getDemandesPrestataires();
        if (!demandesPrestataires) {
            return res.status(500).json({ error: 'ERREUR INTERNE' });
        }
        //console.log(demandesPrestataires)
        const demandePrestataire = demandesPrestataires.find(demandePrestataire => demandePrestataire.id == uuid);
        //console.log(demandePrestataire)
        if (!demandePrestataire) {
            return res.status(404).json({ error: 'DemandePrestataire non trouvé' });
        }
        return res.status(200).json({ data: demandePrestataire });
    } catch (error) {
        console.error('Erreur lors de la récupération du demandePrestataire :', error);
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
};

exports.updateDemandePrestataire = async (req,res) => {

    const uuid = req.params.uuid;
    const societe = req.body.societe;
    const adresse = req.body.adresse;
    const email = req.body.email;
    const statut = req.body.statut;
    const password = req.body.password;
    const resultat = await demandesPrestatairesService.updateDemandePrestataire(uuid, societe, adresse, email, statut, password);
    if(resultat){
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("MODIFICATION ENREGISTREE");
};

exports.deleteDemandePrestataire = async (req, res) => {
    const { uuid } = req.params;

    try {
        const result = await demandesPrestatairesService.deleteDemandePrestataire(uuid);

        if (!result) {
            return res.status(200).json({ message: 'Demande de prestataire supprimé avec succès' });
        } else {
            return res.status(404).json({ message: 'Demande de prestataire non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de la demande de prestataire:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
