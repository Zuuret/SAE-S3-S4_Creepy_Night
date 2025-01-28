const pool = require('../database/db');
const format = require('pg-format');

async function insertOrganisateur(id, nom, prenom, email, password, tel) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [id, nom, prenom, email, password, tel]
        ]
        const query = format('INSERT INTO Organisateur (id, nom, prenom, email, password, tel) VALUES %L', data);
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

async function getOrganisateurs() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM Organisateur');
        console.log('RECUPERATION DES PRESTATAIRES');
    } catch (error) {
        console.error('Erreur lors de la récupération des prestatairess :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function updateOrganisateur(id, nom, prenom, email, password, tel) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('UPDATE Organisateur SET societe = %L, adresse = %L, email = %L, password = %L, tel = %L WHERE id = %L', societe, adresse, email, password, tel, id);
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

async function deleteOrganisateur(id) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('DELETE FROM Organisateur WHERE id = %L RETURNING *',id);
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
    insertOrganisateur,
    getOrganisateurs,
    updateOrganisateur,
    deleteOrganisateur
}