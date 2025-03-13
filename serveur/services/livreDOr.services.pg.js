const pool = require('../database/db');
const format = require('pg-format');

async function insertLivreDOr(id, prestataireId, nomUtilisateur, evaluation, message, date) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [id, prestataireId, nomUtilisateur, evaluation, message, date]
        ]
        const query = format('INSERT INTO livre_DOr (id, prestataireId, nomUtilisateur, evaluation, message, date) VALUES %L', data);
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

async function getLivreDOr() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM livre_DOr');
        console.log('RECUPERATION DES PRESTATAIRES');
    } catch (error) {
        console.error('Erreur lors de la récupération des prestatairess :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function updateLivreDOr(id, prestataireId, nomUtilisateur, evaluation, message, date) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('UPDATE livre_DOr SET prestataireId = %L, nomUtilisateur = %L, evaluation = %L, message = %L, date = %L WHERE id = %L', prestataireId, nomUtilisateur, evaluation, message, date, id);
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

async function deleteLivreDOr(id) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('DELETE FROM livre_DOr WHERE id = %L RETURNING *', id);
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
    insertLivreDOr,
    getLivreDOr,
    updateLivreDOr,
    deleteLivreDOr
}