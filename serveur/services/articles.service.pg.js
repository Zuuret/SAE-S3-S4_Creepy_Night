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
        console.log("MISE A JOUR D'ARTICLES");
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

async function getArticleById(idArticle) {
    const client = await pool.connect();
    let res;
    try {
        const query = 'SELECT * FROM articles WHERE id = $1';
        res = await client.query(query, [idArticle]);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'article :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function saveArticleToCart(article, utilisateur_id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const stockQuery = 'SELECT stock FROM articles WHERE id = $1';
        const stockRes = await client.query(stockQuery, [article.id]);
        if (stockRes.rowCount === 0) {
            await client.query('ROLLBACK');
            return { error: "Article non trouvé" };
        }
        const stockDisponible = stockRes.rows[0].stock;
        if (stockDisponible <= 0) {
            await client.query('ROLLBACK');
            return { error: "Stock insuffisant" };
        }

        const selectQuery = 'SELECT id, quantite FROM panier_article WHERE article_id = $1 AND utilisateur_id = $2';
        const selectRes = await client.query(selectQuery, [article.id, utilisateur_id]);
        let panierRow;
        if (selectRes.rowCount > 0) {
            const updateQuery = 'UPDATE panier_article SET quantite = quantite + 1 WHERE article_id = $1 AND utilisateur_id = $2 RETURNING id';
            const updateRes = await client.query(updateQuery, [article.id, utilisateur_id]);
            panierRow = updateRes.rows[0];
        } else {
            const insertQuery = 'INSERT INTO panier_article (utilisateur_id, article_id, quantite) VALUES ($1, $2, 1) RETURNING id';
            const insertRes = await client.query(insertQuery, [utilisateur_id, article.id]);
            panierRow = insertRes.rows[0];
        }

        const decrementStockQuery = 'UPDATE articles SET stock = stock - 1 WHERE id = $1 RETURNING stock';
        await client.query(decrementStockQuery, [article.id]);

        const joinQuery = `
          SELECT pa.id as panier_id, pa.quantite, pa.utilisateur_id,
                 a.id as article_id, a.nom, a.prix, a.image, a.description, a.stock
          FROM panier_article pa
          JOIN articles a ON pa.article_id = a.id
          WHERE pa.id = $1
        `;
        const joinRes = await client.query(joinQuery, [panierRow.id]);

        await client.query('COMMIT');
        return joinRes.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Erreur dans saveArticleToCart :", error);
        return { error: "Erreur interne du serveur" };
    } finally {
        client.release();
    }
}

async function getCart(idUtilisateur) {
    const client = await pool.connect();
    try {
        const query = `
          SELECT pa.id as panier_id, pa.quantite, pa.utilisateur_id,
                 a.id as article_id, a.nom, a.prix, a.image, a.description, a.stock
          FROM panier_article pa
          JOIN articles a ON pa.article_id = a.id
          WHERE pa.utilisateur_id = $1
        `;
        const result = await client.query(query, [idUtilisateur]);
        return result.rows;
    } catch (error) {
        console.error("Erreur lors de la récupération du panier :", error);
        return false;
    } finally {
        client.release();
    }
}

async function incrementArticleInCart(cart_item_id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const selectCartQuery = 'SELECT article_id, quantite FROM panier_article WHERE id = $1';
        const cartRes = await client.query(selectCartQuery, [cart_item_id]);
        if (cartRes.rowCount === 0) {
            await client.query('ROLLBACK');
            return { error: "L'article n'est pas dans le panier" };
        }
        const { article_id } = cartRes.rows[0];

        const stockQuery = 'SELECT stock FROM articles WHERE id = $1';
        const stockRes = await client.query(stockQuery, [article_id]);
        if (stockRes.rowCount === 0) {
            await client.query('ROLLBACK');
            return { error: "Article non trouvé" };
        }
        if (stockRes.rows[0].stock <= 0) {
            await client.query('ROLLBACK');
            return { error: "Stock insuffisant" };
        }

        const updateCartQuery = 'UPDATE panier_article SET quantite = quantite + 1 WHERE id = $1 RETURNING *';
        const updateRes = await client.query(updateCartQuery, [cart_item_id]);

        const decrementStockQuery = 'UPDATE articles SET stock = stock - 1 WHERE id = $1 RETURNING stock';
        await client.query(decrementStockQuery, [article_id]);

        const joinQuery = `
      SELECT pa.id as panier_id, pa.quantite, pa.utilisateur_id,
             a.id as article_id, a.nom, a.prix, a.image, a.description, a.stock
      FROM panier_article pa
      JOIN articles a ON pa.article_id = a.id
      WHERE pa.id = $1
    `;
        const joinRes = await client.query(joinQuery, [cart_item_id]);

        await client.query('COMMIT');
        return joinRes.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Erreur dans incrementArticleInCart :", error);
        return { error: "Erreur interne du serveur" };
    } finally {
        client.release();
    }
}

async function decrementArticleInCart(cart_item_id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const selectCartQuery = 'SELECT article_id, quantite FROM panier_article WHERE id = $1';
        const cartRes = await client.query(selectCartQuery, [cart_item_id]);
        if (cartRes.rowCount === 0) {
            await client.query('ROLLBACK');
            return { error: "L'article n'est pas dans le panier" };
        }
        const { article_id, quantite } = cartRes.rows[0];

        const incrementStockQuery = 'UPDATE articles SET stock = stock + 1 WHERE id = $1 RETURNING stock';
        await client.query(incrementStockQuery, [article_id]);

        let result;
        if (quantite > 1) {
            const updateCartQuery = 'UPDATE panier_article SET quantite = quantite - 1 WHERE id = $1 RETURNING *';
            result = await client.query(updateCartQuery, [cart_item_id]);
        } else {
            const deleteCartQuery = 'DELETE FROM panier_article WHERE id = $1 RETURNING *';
            result = await client.query(deleteCartQuery, [cart_item_id]);
        }

        let joinRes;
        if (result.rowCount > 0) {
            const joinQuery = `
        SELECT pa.id as panier_id, pa.quantite, pa.utilisateur_id,
               a.id as article_id, a.nom, a.prix, a.image, a.description, a.stock
        FROM panier_article pa
        JOIN articles a ON pa.article_id = a.id
        WHERE pa.id = $1
      `;
            joinRes = await client.query(joinQuery, [cart_item_id]);
        } else {
            joinRes = { rows: [] };
        }

        await client.query('COMMIT');

        if (joinRes.rows.length > 0) {
            return joinRes.rows[0];
        } else {
            return { removed: true };
        }
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Erreur dans decrementArticleInCart :", error);
        return { error: "Erreur interne du serveur" };
    } finally {
        client.release();
    }
}

module.exports = {
    getAllArticlesById,
    getAllArticles,
    insertArticle,
    updateArticle,
    deleteArticle,
    getArticleById,
    saveArticleToCart,
    getCart,
    incrementArticleInCart,
    decrementArticleInCart
};
