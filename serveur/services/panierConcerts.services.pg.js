const pool = require('../database/db');
const format = require('pg-format');

async function insertPanierConcerts(id_place, id_concert, type_place, nb_places, prix_place) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [id_place, id_concert, type_place, nb_places, prix_place]
        ]
        const query = format('INSERT INTO places_concerts (id_place, id_concert, type_place, nb_places, prix_place) VALUES %L', data);
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

async function getPanierConcerts() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM places_concerts');
        console.log('RECUPERATION DES PRESTATAIRES');
    } catch (error) {
        console.error('Erreur lors de la récupération des prestatairess :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function updatePanierConcerts(id_place, id_concert, type_place, nb_places, prix_place) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('UPDATE places_concerts SET socid_concertiete = %L, type_place = %L, nb_places = %L, prix_place = %L WHERE id = %L', id_concert, type_place, nb_places, prix_place, id_place);
        await client.query(query);
        console.log('MISE A JOUR DU PRESTATAIRE');
    } catch (error) {
        console.error('Erreur lors de la mise à jour du prestataire :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

async function deletePanierConcerts(id_place) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('DELETE FROM places_concerts WHERE id = %L RETURNING *', id_place);
        await client.query(query);
        console.log('SUPPRESSION DU PRESTATAIRE');
    } catch (error) {
        console.error('Erreur lors de la suppression du prestataire :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

module.exports = {
    insertPanierConcerts,
    getPanierConcerts,
    updatePanierConcerts,
    deletePanierConcerts
}