const pool = require('../database/db');
const format = require('pg-format');

async function insertReservConcert(id, utilisateur_id, concert_id, nb_places, date_reservation) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [id, utilisateur_id, concert_id, nb_places, date_reservation]
        ]
        const query = format('INSERT INTO Concert (id, utilisateur_id, concert_id, nb_places, date_reservation) VALUES %L', data);
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

async function getReservConcert() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM reservation_concert');
        console.log('RECUPERATION DES RESERVATIONS DE CONCERT');
    } catch (error) {
        console.error('Erreur lors de la récupération des réservations :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function updateReservConcert(id, utilisateur_id, concert_id, nb_places, date_reservation) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('UPDATE Concert SET utilisateur_id = %L, concert_id = %L, nb_places = %L, date_reservation = %L WHERE id = %L', utilisateur_id, concert_id, nb_places, date_reservation, id);
        await client.query(query);
        console.log('MISE A JOUR DU CONCERT');
    } catch (error) {
        console.error('Erreur lors de la mise à jour du concert :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

async function deleteReservConcert(id) {
    const client = await pool.connect();
    let is_error = false;
    console.log(id)
    try {
        const query = format('DELETE FROM Concert WHERE id = %L RETURNING *',id);
        await client.query(query);
        console.log('SUPPRESSION DU CONCERT');
    } catch (error) {
        console.error('Erreur lors de la suppression du concert :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

module.exports = {
    insertReservConcert,
    getReservConcert,
    updateReservConcert,
    deleteReservConcert
}