const { v4 : uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const concertService = require("../services/concerts.services.pg");
const {FALSE} = require("pg-format/lib/reserved");

exports.saveConcert = async (req,res) => {
    const artiste = req.body.artiste;
    const nationalite = req.body.nationalite;
    const date = req.body.date;
    const heure = req.body.heure;
    const duree = 1;
    const categorie = req.body.categorie;
    const scene = req.body.scene;
    const nb_places = req.body.nb_places;
    const prix_place = req.body.prix_place;
    const image = req.body.image;
    const resultat = await concertService.insertConcert(artiste, nationalite, date, heure, duree, categorie, scene, nb_places, prix_place, image);
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("INSERTION AVEC SUCCES");
}

exports.getConcerts = async (req, res) => {
    const concerts = await concertService.getConcerts();
    if (!concerts) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: concerts });
};

exports.getConcertById = async (req, res) => {
    const uuid = req.params.uuid;
    //console.log(uuid)
    try {
        const concerts = await concertService.getConcerts();
        if (!concerts) {
            return res.status(500).json({ error: 'ERREUR INTERNE' });
        }
        //console.log(concerts)
        const concert = concerts.find(concert => concert.id == uuid);
        //console.log(concert)
        if (!concert) {
            return res.status(404).json({ error: 'Concert non trouvé' });
        }
        return res.status(200).json({ data: concert });
    } catch (error) {
        console.error('Erreur lors de la récupération du concert :', error);
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
};

exports.updateConcert = async (req,res) => {
    
    const id = req.params.id;
    const artiste = req.body.artiste;
    const nationalite = req.body.nationalite;
    const date = req.body.date;
    const heure = req.body.heure;
    const duree = 1;
    const categorie = req.body.categorie;
    const scene = req.body.scene;
    const nb_places = req.body.nb_places;
    const prix_place = req.body.prix_place;
    const image = req.body.image;
    const resultat = await concertService.updateConcert(id,artiste,nationalite,date,heure,duree,categorie,scene, nb_places, prix_place, image);
    if(resultat){
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("MODIFICATION ENREGISTREE");
};

exports.deleteConcert = async (req, res) => {
    const { id } = req.params;
    //console.log(id)
    try {
        const result = await concertService.deleteConcert(id);

        if (!result) {
            return res.status(200).json({ message: 'Concert supprimé avec succès' });
        } else {
            return res.status(404).json({ message: 'Concert non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du concert:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
