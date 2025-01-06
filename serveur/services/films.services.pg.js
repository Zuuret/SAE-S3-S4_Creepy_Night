const pool = require('../database/db');
const format = require('pg-format');

async function insertFilm(nom, date, duree, image, categorie, salle, nb_places, prix) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [nom, date, duree, image, categorie, salle, nb_places, prix]
        ]
        const query = format('INSERT INTO Films (nom, date, duree, image, categorie, salle, nb_places, prix) VALUES %L', data);
        await client.query(query);
        console.log('INSERTIONS AVEC SUCCES');
    } catch (error) {
        console.error('Erreur : ', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

async function getFilms() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM Films');
        console.log('RECUPERATION DES FILMS');
    } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function updateFilm(id,nom, date, duree, image, categorie, salle, nb_places, prix) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('UPDATE Films SET nom = %L,date = %L, duree = %L, image = %L, categorie = %L, salle = %L, nb_places = %L, prix = %L WHERE id = %L',nom, date, duree, image, categorie, salle, nb_places, prix, id);
        await client.query(query);
        console.log('MISE A JOUR DU FILM');
    } catch (error) {
        console.error('Erreur lors de la mise à jour du film :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

async function deleteFilm(id) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('DELETE FROM Films WHERE id = %L RETURNING *',id);
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
    insertFilm,
    getFilms,
    updateFilm,
    deleteFilm
}