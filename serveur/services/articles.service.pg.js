const pool = require('../database/db');

async function getAllArticlesById(idPrestataire) {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM articles WHERE prestataire_id = $1';
        const result = await client.query(query, [idPrestataire]);
        return result.rows;
    } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    getAllArticlesById,
};
