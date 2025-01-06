const pool = require('../database/db');
const format = require('pg-format');

async function insertPrestation(nom, prix, description, image, zone_id) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [nom, prix, description, image, zone_id]
        ]
        const query = format('INSERT INTO Prestation (nom, prix, description, image, zone_id) VALUES %L', data);
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

async function getPrestations() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM Prestation');
        console.log('RECUPERATION DES PRESTATIONS');
    } catch (error) {
        console.error('Erreur lors de la récupération des prestations :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function updatePrestation(id, nom, prix, description, image, zone_id) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('UPDATE Prestation SET nom = %L,prix = %L, description = %L, image = %L, zone_id = %L WHERE id = %L', nom, prix, description, image, zone_id, id);
        await client.query(query);
        console.log('MISE A JOUR DU PRESTATION');
    } catch (error) {
        console.error('Erreur lors de la mise à jour du prestation :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

async function deletePrestation(id) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('DELETE FROM Prestation WHERE id = %L RETURNING *',id);
        await client.query(query);
        console.log('SUPPRESSION DU PRESTATION');
    } catch (error) {
        console.error('Erreur lors de la suppression du prestation :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

module.exports = {
    insertPrestation,
    getPrestations,
    updatePrestation,
    deletePrestation
}