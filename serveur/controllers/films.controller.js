const { v4 : uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const filmService = require("../services/films.services.pg");
const {FALSE} = require("pg-format/lib/reserved");

exports.saveFilm = async (req,res) => {
    const nom = req.body.nom;
    const date = req.body.date;
    const heure = req.body.heure;
    const image = req.body.image;
    const categorie = req.body.categorie;
    const salle = req.body.salle;
    const nb_places = req.body.nb_places;
    const prix = req.body.prix;
    const resultat = await filmService.insertFilm(nom, date, heure, image, categorie, salle, nb_places, prix);
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("INSERTION AVEC SUCCES");
}

exports.getFilms = async (req, res) => {
    const films = await filmService.getFilms();
    if (!films) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({error: 0, data: films });
};

exports.getFilmById = async (req, res) => {
    const id = req.params.id;
    //console.log(uuid)
    try {
        const films = await filmService.getFilms();
        if (!films) {
            return res.status(500).json({ error: 'ERREUR INTERNE' });
        }
        //console.log(films)
        const film = films.find(film => film.id == id);
        //console.log(film)
        if (!film) {
            return res.status(404).json({ error: 'Film non trouvé' });
        }
        return res.status(200).json({ error: 0, data: film });
    } catch (error) {
        console.error('Erreur lors de la récupération du film :', error);
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
};

exports.updateFilm = async (req,res) => {
    
    const id = req.params.id;
    const nom = req.body.nom;
    const date = req.body.date;
    const heure = req.body.heure;
    const image = req.body.image;
    const categorie = req.body.categorie;
    const salle = req.body.salle;
    const nb_places = req.body.nb_places;
    const prix = req.body.prix;
    const resultat = await filmService.updateFilm(id,nom, date, heure, image, categorie, salle, nb_places, prix);
    if(resultat){
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("MODIFICATION ENREGISTREE");
};

exports.deleteFilm = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await filmService.deleteFilm(id);

        if (!result) {
            return res.status(200).json({ message: 'Film supprimé avec succès' });
        } else {
            return res.status(404).json({ message: 'Film non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du film:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
