const pool = require('../database/db');
const format = require('pg-format');

async function insertPlacesConcerts(id, prestataireId, nom, description, prix, stock, image) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [id_place, id_concert, type_place, nb_places, prix_place]
        ]
        const query = format('INSERT INTO places_concerts (id, prestataireId, nom, description, prix, stock, image) VALUES %L', data);
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

async function getPlacesConcerts() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM places_concerts');
        console.log('RECUPERATION DES PRESTATAIRES');
    } catch (error) {
        console.error('Erreur lors de la récupération des prestatairess :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function updatePlacesConcerts(id_place, id_concert, type_place, nb_places, prix_place) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('UPDATE places_concerts SET id_concert = %L, type_place = %L, nb_places = %L, prix_place = %L WHERE id_place = %L', id_concert, type_place, nb_places, prix_place, id_place);
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

async function deletePlacesConcerts(id_place) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('DELETE FROM places_concerts WHERE id = %L RETURNING *', id_place);
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

async function insertReservationArticle(utilisateur_id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const cartQuery = `
          SELECT pa.id as panier_id, pa.quantite, pa.utilisateur_id,
                 a.id as article_id, a.nom, a.prix, a.image, a.description, a.stock
          FROM panier_article pa
          JOIN articles a ON pa.article_id = a.id
          WHERE pa.utilisateur_id = $1
        `;
        const cartRes = await client.query(cartQuery, [utilisateur_id]);
        const cartItems = cartRes.rows;

        if (cartItems.length === 0) {
            await client.query('ROLLBACK');
            return { error: "Panier vide" };
        }

        const reservations = [];
        let totalPrix = 0;

        for (const item of cartItems) {
            const insertQuery = `
              INSERT INTO reservation_article (utilisateur_id, article_id, quantite, date_reservation)
              VALUES ($1, $2, $3, NOW())
              RETURNING *
            `;
            const res = await client.query(insertQuery, [utilisateur_id, item.article_id, item.quantite]);
            reservations.push(res.rows[0]);

            totalPrix += item.quantite * item.prix;
        }

        const soldeQuery = `SELECT solde FROM utilisateur WHERE id = $1`;
        const soldeRes = await client.query(soldeQuery, [utilisateur_id]);
        if (soldeRes.rows.length === 0) {
            throw new Error("Utilisateur introuvable");
        }
        const soldeActuel = soldeRes.rows[0].solde;
        if (soldeActuel < totalPrix) {
            throw new Error("Solde insuffisant");
        }

        const updateSoldeQuery = `
          UPDATE utilisateur
          SET solde = solde - $1
          WHERE id = $2
          RETURNING solde
        `;
        const updateSoldeRes = await client.query(updateSoldeQuery, [totalPrix, utilisateur_id]);

        const deleteQuery = `DELETE FROM panier_article WHERE utilisateur_id = $1`;
        await client.query(deleteQuery, [utilisateur_id]);

        await client.query('COMMIT');
        return { reservations, solde: updateSoldeRes.rows[0].solde };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Erreur dans insertReservationArticle :", error);
        return { error: "Erreur interne du serveur" };
    } finally {
        client.release();
    }
}

module.exports = {
    insertPlacesConcerts,
    getPlacesConcerts,
    updatePlacesConcerts,
    deletePlacesConcerts,
    insertReservationArticle
}