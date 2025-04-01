const pool = require('../database/db');
const format = require('pg-format');

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

async function getAllArticles() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM articles');
        console.log('RECUPERATION DES ARTICLES');
    } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function insertArticle(prestataire_id, nom, description, prix, stock, image) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [prestataire_id, nom, description, prix, stock, image]
        ]
        const query = format('INSERT INTO articles (prestataire_id, nom, description, prix, stock, image) VALUES %L', data);
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

async function updateArticle(id, prestataire_id, nom, description, prix, stock, image) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('UPDATE articles SET prestataire_id = %L, nom = %L, description = %L, prix = %L, stock = %L, image = %L WHERE id = %L', prestataire_id, nom, description, prix, stock, image, id);
        await client.query(query);
        console.log('MISE A JOUR DU CONCERT');
    } catch (error) {
        console.error('Erreur lors de la mise à jour du concert :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

async function deleteArticle(id) {
    const client = await pool.connect();
    let is_error = false;
    console.log(id)
    try {
        const query = format('DELETE FROM articles WHERE id = %L RETURNING *',id);
        await client.query(query);
        console.log('SUPPRESSION ARTICLE');
    } catch (error) {
        console.error("Erreur lors de la suppression d'article :", error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

module.exports = {
    getAllArticlesById,
    getAllArticles,
    insertArticle,
    updateArticle,
    deleteArticle,
};
