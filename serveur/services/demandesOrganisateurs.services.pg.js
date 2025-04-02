const pool = require('../database/db');
const format = require('pg-format');

async function insertDemandeOrganisateurs(id, nom, prenom, email, tel, password) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [id, nom, prenom, email, tel, password]
        ]
        const query = format('INSERT INTO demandes_organisateurs (id, nom, prenom, email, tel, password) VALUES %L', data);
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

async function getDemandesOrganisateurs() {
    const client = pool.connect();
    let res;
    try {
        res = await client.query(format('SELECT * FROM demandes_organisateurs'));
        console.log('RECUPERATION DES PRESTATAIRES');
    } catch (error) {
        console.error('Erreur lors de la récupération des prestatairess :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function updateDemandeOrganisateurs(id, nom, prenom, email, tel, password) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('UPDATE demandes_organisateurs SET societe = %L, adresse = %L, email = %L, tel = %L, password = %L WHERE id = %L', societe, adresse, email, tel, password, id);
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

async function deleteDemandeOrganisateurs(id) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('DELETE FROM demandes_organisateurs WHERE id = %L RETURNING *',id);
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
    insertDemandeOrganisateurs,
    getDemandesOrganisateurs,
    updateDemandeOrganisateurs,
    deleteDemandeOrganisateurs
}