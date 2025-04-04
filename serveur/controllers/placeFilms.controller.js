const { v4 : uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const placeFilmsService = require("../services/placeFilms.services.pg");
const userService = require("../services/users.services.pg");
const {FALSE} = require("pg-format/lib/reserved");

exports.savePlaceFilm = async (req,res) => {
    id_user = req.body.id_user;
    id_film = req.body.id_film;
    nb_places = req.body.nb_places;
    prix_billets = req.body.prix_billets;
    nom_film = req.body.nom_film;

    const users = await userService.getUsers();
    if (!users)  res.status(404).json({ error: 1, data: 'Utilisateurs non trouvés' });

    const user = users.find(u => u.id === id_user);
    if (!user) res.status(404).json({ error: 1, data: 'Utilisateur non trouvé' });

    const places_films = await placeFilmsService.getPlaceFilms();
    const res_film = places_films.find(c => c.id_film === id_film);

    if (res_film.nb_places < nb_places) res.status(404).json({ error: 1,  data: 'Pas assez de places disponibles' });
    if (user.solde < prix_billets) res.status(404).json({ error: 1, data: 'Solde insuffisant' });

    let resultat = userService.updateUser(user.id, user.nom, user.prenom, user.date_naissance, user.mail, user.password, user.solde-prix_billets, user.est_festivalier)

    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }

    resultat = placeFilmsService.insertPlaceFilm(user.id, nom_film, id_film, nb_places, prix_billets, [res_film.id_film, res_film.type_place, res_film.nb_places-nb_places, res_film.prix_place]);
    console.log('Achat de billets pour les films effectué avec succès, il reste', res_film.nb_places, 'places disponibles, solde restant :', user.solde, '€', 'pour l\'utilisateur', user.id, user.prenom, user.nom, film[2], 'billets achetés, prix total :', film[3], '€, film :', film[4]);

    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("INSERTION AVEC SUCCES");
}

exports.getPlaceFilms = async (req, res) => {
    const id = req.params.idFilm;
    const places_films = await placeFilmsService.getPlaceFilms();
    if (!places_films) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    // console.log(places_films)
    let places_film = places_films.find(place => place.id_film == id)
    // console.log(places_film)
    if (!places_film) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ error: 0, data: places_film });
};

exports.deletePlaceFilm = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await placeFilmsService.deleteFilm(id);

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
