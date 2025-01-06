const { v4 : uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const filmService = require("../services/films.services.pg");
const {FALSE} = require("pg-format/lib/reserved");

exports.saveFilm = async (req,res) => {
    const nom = req.body.nom;
    const date = req.body.date;
    const duree = req.body.duree;
    const image = req.body.image;
    const categorie = req.body.categorie;
    const salle = req.body.salle;
    const nb_places = req.body.scene;
    const prix = req.body.scene;
    const resultat = await filmService.insertFilm(nom, date, duree, image, categorie, salle, nb_places, prix);
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
    return res.status(200).json({ data: films });
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
        return res.status(200).json({ data: film });
    } catch (error) {
        console.error('Erreur lors de la récupération du film :', error);
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
};

exports.updateFilm = async (req,res) => {
    
    const id = req.params.uuid;
    const nom = req.body.nom;
    const date = req.body.date;
    const duree = req.body.duree;
    const image = req.body.image;
    const categorie = req.body.categorie;
    const salle = req.body.salle;
    const nb_places = req.body.scene;
    const prix = req.body.scene;
    const resultat = await filmService.updateFilm(id,nom, date, duree, image, categorie, salle, nb_places, prix);
    if(resultat){
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("MODIFICATION ENREGISTREE");
};

exports.deleteFilm = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await filmService.deleteFilm(id);

        if (result) {
            return res.status(200).json({ message: 'Film supprimé avec succès' });
        } else {
            return res.status(404).json({ message: 'Film non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du film:', error);
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