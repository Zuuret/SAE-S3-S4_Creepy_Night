const pool = require('../database/db');
const format = require('pg-format');

async function getEmplacement() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM emplacement');
        console.log('Emplacement RÉCUPÉRÉ');
    } catch (error) {
        console.error('Erreur lors de la récupération de l emplacement :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || [];
}

async function updateEmplacement(id, nom, coord_x, coord_y, prestataire_id, icone_id) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format(
            'UPDATE emplacement SET nom = %L, coord_x = %L, coord_y = %L, prestataire_id = %L, icone_id = %L WHERE id = %L',
            nom,
            coord_x,
            coord_y,
            prestataire_id,
            icone_id,
            id
        );
        await client.query(query);
        console.log('EMPLACEMENT MIS À JOUR');
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'emplacement :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

module.exports = {
    getEmplacement,
    updateEmplacement
};