const pool = require('../database/db');
const format = require('pg-format');

async function insertPrestataire(id, societe, adresse, email, password, theme, description, logo, background, background2) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [id, societe, adresse, email, password, theme, description, logo, background, background2]
        ];
        const query = format(
            'INSERT INTO Prestataire (id, societe, adresse, email, password, theme, description, logo, background, background2) VALUES %L',
            data
        );
        await client.query(query);
        console.log('INSERTIONS AVEC SUCCÈS');
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
    try {
        const res = await client.query('SELECT * FROM Prestataire'); 
        return res.rows;
    } catch (error) {
        console.error('Erreur lors de la récupération des prestataires:', error);
        throw error;
    } finally {
        client.release();
    }
}

async function updatePrestataire(uuid,societe, adresse, email, password, theme, description, logo, background, background2) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('UPDATE Prestataire SET societe = %L,adresse = %L, email = %L, password = %L, theme = %L, description = %L, logo = %L, background = %L, background2 = %L WHERE id = %L', societe, adresse, email, password, theme, description, logo, background, background2, uuid);
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

async function updateDescriptionPrestataire(uuid, description) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format(
            'UPDATE prestataire SET description = %L WHERE id = %L', description, uuid
        );
        await client.query(query);
        console.log('DESCRIPTION DU PRESTATAIRE MIS À JOUR');
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la description :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

async function updateSocietePrestataire(uuid, societe) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format(
            'UPDATE prestataire SET societe = %L WHERE id = %L', societe, uuid
        );
        await client.query(query);
        console.log('SOCIETE DU PRESTATAIRE MIS À JOUR');
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la société :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

async function updateThemePrestataire(uuid, theme) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format(
            'UPDATE prestataire SET theme = %L WHERE id = %L', theme, uuid
        );
        await client.query(query);
        console.log('THEME DU PRESTATAIRE MIS À JOUR');
    } catch (error) {
        console.error('Erreur lors de la mise à jour du thème :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

async function updateAdressePrestataire(uuid, adresse) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format(
            'UPDATE prestataire SET adresse = %L WHERE id = %L', adresse, uuid
        );
        await client.query(query);
        console.log('ADRESSE DU PRESTATAIRE MIS À JOUR');
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'adresse :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

async function updateImagePrestataire(uuid, background) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format(
            'UPDATE prestataire SET background = %L WHERE id = %L', background, uuid
        );
        await client.query(query);
        console.log('BACKGROUND DU PRESTATAIRE MIS À JOUR');
    } catch (error) {
        console.error('Erreur lors de la mise à jour du background :', error);
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
    deletePrestataire,
    updateDescriptionPrestataire,
    updateSocietePrestataire,
    updateThemePrestataire,
    updateAdressePrestataire
}