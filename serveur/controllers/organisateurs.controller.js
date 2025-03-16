const { v4 : uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const organisateursService = require("../services/organisateurs.services.pg");
const {FALSE} = require("pg-format/lib/reserved");

exports.saveOrganisateur = async (req,res) => {
    const uuid = uuidv4()
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const tel = req.body.tel;
    const motDePasse = req.body.motDePasse;
    const resultat = await organisateursService.insertOrganisateur(uuid, nom, prenom, email, tel, motDePasse);
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("INSERTION AVEC SUCCES");
}

exports.getOrganisateurs = async (req, res) => {
    const organisateurs = await organisateursService.getOrganisateurs();
    if (!organisateurs) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: organisateurs });
};

exports.getOrganisateurById = async (req, res) => {
    const uuid = req.params.uuid;
    //console.log(uuid)
    try {
        const organisateurs = await organisateursService.getOrganisateurs();
        if (!organisateurs) {
            return res.status(500).json({ error: 'ERREUR INTERNE' });
        }
        //console.log(organisateurs)
        const organisateur = organisateurs.find(organisateur => organisateur.id == uuid);
        //console.log(organisateur)
        if (!organisateur) {
            return res.status(404).json({ error: 'Organisateur non trouvé' });
        }
        return res.status(200).json({ data: organisateur });
    } catch (error) {
        console.error('Erreur lors de la récupération du organisateur :', error);
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
};

exports.updateOrganisateur = async (req,res) => {
    const uuid = req.params.uuid;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const tel = req.body.tel;
    const motDePasse = req.body.motDePasse;
    const resultat = await organisateursService.updateOrganisateur(uuid, nom, prenom, email, tel, motDePasse);
    if(resultat){
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("MODIFICATION ENREGISTREE");
};

exports.deleteOrganisateur = async (req, res) => {
    const { uuid } = req.params;

    try {
        const result = await organisateursService.deleteOrganisateur(uuid);

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