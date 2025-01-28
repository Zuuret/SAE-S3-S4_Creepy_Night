const pool = require('../database/db');
const format = require('pg-format');

async function insertDemandePrestataire(id, societe, adresse, email, statut, motDePasse) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [id, societe, adresse, email, statut, motDePasse]
        ]
        const query = format('INSERT INTO demandes_prestataires (id, societe, adresse, email, statut, motDePasse) VALUES %L', data);
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

async function getDemandesPrestataires() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM demandes_prestataires');
        console.log('RECUPERATION DES PRESTATAIRES');
    } catch (error) {
        console.error('Erreur lors de la récupération des prestatairess :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function updateDemandePrestataire(uuid, societe, adresse, email, statut, motDePasse) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('UPDATE demandes_prestataires SET societe = %L, adresse = %L, email = %L, statut = %L, motDePasse = %L WHERE id = %L', societe, adresse, email, statut, motDePasse, uuid);
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

async function deleteDemandePrestataire(uuid) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('DELETE FROM demandes_prestataires WHERE id = %L RETURNING *', uuid);
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
    insertDemandePrestataire,
    getDemandesPrestataires,
    updateDemandePrestataire,
    deleteDemandePrestataire
}