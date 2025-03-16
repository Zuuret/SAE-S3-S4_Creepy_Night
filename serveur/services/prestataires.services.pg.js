const pool = require('../database/db');
const format = require('pg-format');

async function insertPrestataire(id,societe, adresse, email, password) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [id,societe, adresse, email, password]
        ]
        const query = format('INSERT INTO Prestataire (id,societe, adresse, email, password) VALUES %L', data);
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

async function getPrestataires() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM prestataire');
        console.log('RECUPERATION DES PRESTATAIRES');
    } catch (error) {
        console.error('Erreur lors de la récupération des prestatairess :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function updatePrestataire(uuid,societe, adresse, email, password) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('UPDATE Prestataire SET societe = %L,adresse = %L, email = %L, password = %L WHERE id = %L', societe, adresse, email, password, uuid);
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

async function deletePrestataire(uuid) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('DELETE FROM Prestataire WHERE id = %L RETURNING *',uuid);
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
    insertPrestataire,
    getPrestataires,
    updatePrestataire,
    deletePrestataire
}