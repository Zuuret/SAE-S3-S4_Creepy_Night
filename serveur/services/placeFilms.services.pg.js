const pool = require('../database/db');
const format = require('pg-format');

async function insertPlaceFilm(user, nom_film, id_film, nb_places, prix_billets, liste_places_film) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [user, nom_film, id_film, nb_places, prix_billets]
        ]
        const query = format('INSERT INTO reserve_film (user, nom_film, id_film, nb_places, prix_billets) VALUES %L', data);
        await client.query(query);

        const insertTransactionQuery = `
            INSERT INTO Transaction (date, operation, details, montant, utilisateur_id)
            VALUES (NOW(), $1, $2, $3, $4)
                RETURNING *
        `;

        const operationText = "Place de film - CinePeur";
        const detailsText = `Réservation de commande d'une place de film de ${totalPrix} €`;
        await client.query(insertTransactionQuery, [operationText, detailsText, -totalPrix, utilisateur_id]);

        await client.query(format(`INSERT INTO places_films (id_film, type_place, nb_places, prix_place) VALUES %L RETURNING *`, liste_places_film));

        console.log('INSERTIONS AVEC SUCCES');
    } catch (error) {
        console.error('Erreur : ', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

async function getPlaceFilms() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM places_films');
        console.log('RECUPERATION DES FILMS');
    } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function deletePlaceFilm(id) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('DELETE FROM places_films WHERE id = %L RETURNING *',id);
        await client.query(query);
        console.log('SUPPRESSION DU FILM');
    } catch (error) {
        console.error('Erreur lors de la suppression du film :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

module.exports = {
    insertPlaceFilm,
    getPlaceFilms,
    deletePlaceFilm
}