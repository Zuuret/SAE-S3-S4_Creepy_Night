const pool = require('../database/db');
const format = require('pg-format');

async function insertPanierArticle(id, prestataireId, nom, description, prix, stock, image) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [id, prestataireId, nom, description, prix, stock, image]
        ]
        const query = format('INSERT INTO panier_article (id, prestataireId, nom, description, prix, stock, image) VALUES %L', data);
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

async function getPanierArticle() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM panier_article');
        console.log('RECUPERATION DES PRESTATAIRES');
    } catch (error) {
        console.error('Erreur lors de la récupération des prestatairess :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function updatePanierArticle(id, prestataireId, nom, description, prix, stock, image) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('UPDATE panier_article SET prestataireId = %L, nom = %L, description = %L, prix = %L, stock = %L, image = %L WHERE id = %L', prestataireId, nom, description, prix, stock, image, id);
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

async function deletePanierArticle(id) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('DELETE FROM panier_article WHERE id = %L RETURNING *', id);
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
    insertPanierArticle,
    getPanierArticle,
    updatePanierArticle,
    deletePanierArticle
}