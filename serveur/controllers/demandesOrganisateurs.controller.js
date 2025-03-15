const { v4 : uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const demandeOrganisateursService = require("../services/demandesOrganisateurs.services.pg");
const {FALSE} = require("pg-format/lib/reserved");

exports.saveDemandeOrganisateurs = async (req,res) => {
    const uuid = uuidv4()
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const tel = req.body.tel;
    const password = req.body.password;
    const resultat = await demandeOrganisateursService.insertDemandeOrganisateurs(uuid, nom, prenom, email, tel, password);
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("INSERTION AVEC SUCCES");
}

exports.getDemandesOrganisateurs = async (req, res) => {
    const organisateurs = await demandeOrganisateursService.getDemandesOrganisateurs();
    if (!organisateurs) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: organisateurs });
};

exports.getDemandeOrganisateursById = async (req, res) => {
    const uuid = req.params.uuid;
    //console.log(uuid)
    try {
        const demandesOrganisateurs = await demandeOrganisateursService.getDemandesOrganisateurs();
        if (!demandesOrganisateurs) {
            return res.status(500).json({ error: 'ERREUR INTERNE' });
        }
        //console.log(demandesOrganisateurs)
        const demandeOrganisateurs = demandesOrganisateurs.find(demandeOrganisateurs => demandeOrganisateurs.id == uuid);
        //console.log(demandeOrganisateurs)
        if (!demandeOrganisateurs) {
            return res.status(404).json({ error: 'Organisateur non trouvé' });
        }
        return res.status(200).json({ data: demandeOrganisateurs });
    } catch (error) {
        console.error('Erreur lors de la récupération du organisateur :', error);
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
};

exports.updateDemandeOrganisateurs = async (req,res) => {
    const uuid = req.params.uuid;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const tel = req.body.tel;
    const password = req.body.password;
    const resultat = await demandeOrganisateursService.updateDemandeOrganisateurs(uuid, nom, prenom, email, tel, password);
    if(resultat){
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("MODIFICATION ENREGISTREE");
};

exports.deleteDemandeOrganisateurs = async (req, res) => {
    const { uuid } = req.params;

    try {
        const result = await demandeOrganisateursService.deleteDemandeOrganisateurs(uuid);

        if (!result) {
            return res.status(200).json({ message: 'Organisateur supprimé avec succès' });
        } else {
            return res.status(404).json({ message: 'Organisateur non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'organisation :', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
