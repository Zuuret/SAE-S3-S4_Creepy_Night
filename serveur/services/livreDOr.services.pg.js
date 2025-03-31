const pool = require('../database/db');
const format = require('pg-format');

async function insertLivreDOr(prestataire_id, nom_utilisateur, evaluation, message, date) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format(
            'INSERT INTO livre_dor (prestataire_id, nom_utilisateur, evaluation, message, date) VALUES (%L, %L, %L, %L, %L) RETURNING *',
            prestataire_id, nom_utilisateur, evaluation, message, date
        );
        const result = await client.query(query);
        return result.rows[0];
    } catch (error) {
        console.error('Erreur : ', error);
        is_error = 1;
    } finally {
        client.release();
    }
    return is_error;
}


async function getAllLivreDOr() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM livre_dor');
        console.log('RECUPERATION DES LIVRES D\'OR');
    } catch (error) {
        console.error('Erreur lors de la récupération des livres d\'or :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function getLivreDOrById(prestataire_id) {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM livre_dor WHERE prestataire_id = $1 ORDER BY date DESC', [prestataire_id]);
    } catch (error) {
        console.error('Erreur lors de la récupération du livre d\'or :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function deleteCommentaire(id) {
    const client = await pool.connect();
    let is_error = false;
    try {
        await client.query('DELETE FROM livre_dor WHERE id = $1', [id]);
        console.log('SUPPRESSION DU COMMENTAIRE AVEC ID :', id);
    } catch (error) {
        console.error('Erreur lors de la suppression du commentaire :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}


module.exports = {
    insertLivreDOr,
    getAllLivreDOr,
    getLivreDOrById,
    deleteCommentaire
}