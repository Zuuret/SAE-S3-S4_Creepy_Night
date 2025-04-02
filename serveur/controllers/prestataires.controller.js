const { v4 : uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const prestataireService = require("../services/prestataires.services.pg");
const {FALSE} = require("pg-format/lib/reserved");

exports.savePrestataire = async (req, res) => {
    try {
        const uuid = uuidv4();
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        
        const resultat = await prestataireService.insertPrestataire(
            uuid,
            req.body.societe,
            req.body.adresse,
            req.body.email,
            hashedPassword, 
            req.body.theme,
            req.body.description,
            req.body.logo,
            req.body.background,
            req.body.background2
        );

        if (resultat) {
            return res.status(500).json({ error: 'Erreur lors de la création du prestataire' });
        }
        return res.status(201).json({ message: 'Prestataire créé avec succès', id: uuid });
    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

exports.getPrestataires = async (req, res) => {
    try {
        const prestataires = await prestataireService.getPrestataires();
        return res.status(200).json(prestataires); // Renvoyez directement le tableau
    } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({ error: 'Erreur lors de la récupération des prestataires' });
    }
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
        const prestataire = prestataires.find(prestataire => prestataire.id === uuid);
        //console.log(prestataire)
        if (!prestataire) {
            return res.status(404).json({ error: 'Prestataire non trouvé' });
        }
        return res.status(200).json({ data: prestataire, error: 0 });
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
    const theme = req.body.theme;
    const description = req.body.description;
    const logo = req.body.logo;
    const background = req.body.background;
    const background2 = req.body.background2;
    const resultat = await prestataireService.updatePrestataire(uuid,societe, adresse, email, password, theme, description, logo, background, background2);
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

exports.updateDescription = async (req, res) => {
    const uuid = req.params.uuid;
    const description = req.body.description;
    const resultat = await prestataireService.updateDescriptionPrestataire(uuid, description);
    if (resultat) {
        return res.status(500).send({data :"ERREUR INTERNE", error: 1});
    }
    return res.status(200).send({data : resultat, error: 0});
};

exports.updateSociete = async (req, res) => {
    const uuid = req.params.uuid;
    const societe = req.body.societe;
    const resultat = await prestataireService.updateSocietePrestataire(uuid, societe);
    if (resultat) {
        return res.status(500).send({data :"ERREUR INTERNE", error: 1});
    }
    return res.status(200).send({data : resultat, error: 0});
};

exports.updateTheme = async (req, res) => {
    const uuid = req.params.uuid;
    const theme = req.body.theme;
    const resultat = await prestataireService.updateThemePrestataire(uuid, theme);
    if (resultat) {
        return res.status(500).send({data :"ERREUR INTERNE", error: 1});
    }
    return res.status(200).send({data : resultat, error: 0});
};

exports.updateAdresse = async (req, res) => {
    const uuid = req.params.uuid;
    const adresse = req.body.adresse;
    const resultat = await prestataireService.updateAdressePrestataire(uuid, adresse);
    if (resultat) {
        return res.status(500).send({data :"ERREUR INTERNE", error: 1});
    }
    return res.status(200).send({data : resultat, error: 0});
};

exports.updateImage = async (req, res) => {
    console.log("🔍 Fichier reçu :", req.file); // Affiche le fichier reçu
    console.log("📌 Paramètres reçus :", req.params);

    if (!req.file) {
        return res.status(400).send({ data: "Aucune image reçue", error: 1 });
    }

    const uuid = req.params.uuid;
    const background = req.file.filename; // Nom du fichier stocké

    const resultat = await prestataireService.updateImagePrestataire(uuid, background);

    if (resultat) {
        return res.status(500).send({ data: "ERREUR INTERNE", error: 1 });
    }
    return res.status(200).send({ data: resultat, error: 0 });
};

