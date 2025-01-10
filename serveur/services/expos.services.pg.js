const pool = require('../database/db');
const format = require('pg-format');

async function insertExpo(createur, email, date_crea, description, image) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [createur, email, date_crea, description, image]
        ]
        const query = format('INSERT INTO Expo_oeuvre (createur, email, date_crea, description, image) VALUES %L', data);
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

async function getExpos() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM Expo_oeuvre');
        console.log('RECUPERATION DES EXPOS');
    } catch (error) {
        console.error('Erreur lors de la récupération des expos :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function updateExpo(id,createur, email, date_crea, description, image) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('UPDATE Expo_oeuvre SET createur = %L,email = %L, date_crea = %L, description = %L, image = %L WHERE id = %L', createur, email, date_crea, description, image, id);
        await client.query(query);
        console.log('MISE A JOUR DU EXPO');
    } catch (error) {
        console.error('Erreur lors de la mise à jour du expo :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

async function deleteExpo(id) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('DELETE FROM Expo_oeuvre WHERE id = %L RETURNING *',id);
        await client.query(query);
        console.log('SUPPRESSION DU EXPO');
    } catch (error) {
        console.error('Erreur lors de la suppression du expo :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

module.exports = {
    insertExpo,
    getExpos,
    updateExpo,
    deleteExpo
}