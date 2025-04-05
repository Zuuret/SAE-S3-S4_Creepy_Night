const pool = require('../database/db');
const format = require('pg-format');

async function insertConcert(artiste,nationalite,date,heure,duree,categorie,scene, nb_places, prix_place, image) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [artiste,nationalite,date,heure,duree,categorie,scene, nb_places, prix_place, image]
        ]
        const query = format('INSERT INTO Concert (artiste,nationalite,date,heure,duree,categorie,scene, nb_places, prix_place, image) VALUES %L', data);
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

async function getConcerts() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM Concert');
        console.log('RECUPERATION DES CONCERTS');
    } catch (error) {
        console.error('Erreur lors de la récupération des concerts :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function updateConcert(id,artiste,nationalite,date,heure,duree,categorie,scene, nb_places, prix_place, image) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('UPDATE Concert SET artiste = %L,nationalite = %L, date = %L, heure = %L, duree = %L, categorie = %L, scene = %L, nb_places = %L, prix_place= %L, image = %L WHERE id = %L', artiste, nationalite,date,heure,duree,categorie,scene, nb_places, prix_place, image, id);
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

async function deleteConcert(id) {
    const client = await pool.connect();
    let is_error = false;
    console.log(id)
    try {
        const query = format('DELETE FROM Concert WHERE id = %L RETURNING *',id);
        await client.query(query);
        console.log('SUPPRESSION DU CONCERT');
    } catch (error) {
        console.error('Erreur lors de la suppression du concert :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

async function getPanier(idUtilisateur) {
    const client = await pool.connect();
    try {
        const query = `
          SELECT pc.id as panier_id, pc.nb_places_panier, pc.utilisateur_id,
                 c.id as concert_id, c.artiste, c.prix_place
          FROM panier_concert pc
          JOIN Concert c ON pc.concert_id = c.id
          WHERE pc.utilisateur_id = $1
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

async function insertConcertInPanier(concert, utilisateur_id, quantite = 1) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Vérification du nombre de places disponibles
        const requeteNbPlaces = 'SELECT nb_places FROM Concert WHERE id = $1';
        const resultatPlaces = await client.query(requeteNbPlaces, [concert.id]);

        if (resultatPlaces.rowCount === 0) {
            await client.query('ROLLBACK');
            return { error: "Concert non trouvé" };
        }

        const nbPlacesDisponibles = resultatPlaces.rows[0].nb_places;
        if (nbPlacesDisponibles < quantite) {
            await client.query('ROLLBACK');
            return { error: "Nombre de places insuffisant" };
        }

        // Sélectionner le panier de concert de l'utilisateur
        const requeteSelection = `SELECT id, nb_places_panier FROM panier_concert
                                  WHERE concert_id = $1 AND utilisateur_id = $2`;
        const resultatSelection = await client.query(requeteSelection, [concert.id, utilisateur_id]);

        let lignePanier;

        if (resultatSelection.rowCount > 0) {
            // Mise à jour du panier avec l'ajout de places
            const requeteMaj = `UPDATE panier_concert
                                SET nb_places_panier = nb_places_panier + $1
                                WHERE concert_id = $2 AND utilisateur_id = $3
                                RETURNING id`;
            const resultatMaj = await client.query(requeteMaj, [quantite, concert.id, utilisateur_id]);
            lignePanier = resultatMaj.rows[0];
        } else {
            // Insertion d'un nouvel élément dans le panier
            const requeteInsertion = `INSERT INTO panier_concert (utilisateur_id, concert_id, nb_places_panier)
                                      VALUES ($1, $2, $3)
                                      RETURNING id`;
            const resultatInsertion = await client.query(requeteInsertion, [utilisateur_id, concert.id, quantite]);
            lignePanier = resultatInsertion.rows[0];
        }

        // Mise à jour du nombre de places restantes dans le concert
        const requeteDecrementStock = `UPDATE Concert 
                                       SET nb_places = nb_places - $1 
                                       WHERE id = $2 
                                       RETURNING nb_places`;
        const resultatDecrementStock = await client.query(requeteDecrementStock, [quantite, concert.id]);

        // Si le stock a été mis à jour, récupérer les nouvelles informations du panier
        const requeteJoin = `SELECT pc.id AS panier_id, pc.nb_places_panier, pc.utilisateur_id,
                                    c.id AS concert_id, c.artiste, c.nationalite, c.date, c.heure,
                                    c.duree, c.categorie, c.scene, c.type_place, c.prix_place, c.image, c.nb_places
                             FROM panier_concert pc
                                      JOIN Concert c ON pc.concert_id = c.id
                             WHERE pc.id = $1`;
        const resultatJoin = await client.query(requeteJoin, [lignePanier.id]);

        await client.query('COMMIT');
        return resultatJoin.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Erreur dans insertConcertInPanier :", error);
        return { error: "Erreur interne du serveur" };
    } finally {
        client.release();
    }
}

async function decrementNbPlacesInPanier(panier_item_id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const selectCartQuery = 'SELECT concert_id, nb_places_panier FROM panier_concert WHERE id = $1';
        console.log(panier_item_id)
        const cartRes = await client.query(selectCartQuery, [panier_item_id]);
        if (cartRes.rowCount === 0) {
            await client.query('ROLLBACK');
            return { error: "Le concert n'est pas dans le panier" };
        }
        const { concert_id, nb_places_panier } = cartRes.rows[0];

        const incrementStockQuery = 'UPDATE Concert SET nb_places = nb_places + 1 WHERE id = $1 RETURNING nb_places';
        await client.query(incrementStockQuery, [concert_id]);

        let result;
        if (nb_places_panier > 1) {
            const updateCartQuery = 'UPDATE panier_concert SET nb_places_panier = nb_places_panier - 1 WHERE id = $1 RETURNING *';
            result = await client.query(updateCartQuery, [panier_item_id]);
        } else {
            const deleteCartQuery = 'DELETE FROM panier_concert WHERE id = $1 RETURNING *';
            result = await client.query(deleteCartQuery, [panier_item_id]);
        }
        let joinRes;
        if (result.rowCount > 0) {
            const joinQuery = `
                SELECT pc.id AS panier_id,
                       pc.nb_places_panier,
                       pc.utilisateur_id,
                       c.id  AS concert_id,
                       c.artiste,
                       c.nationalite,
                       c.date,
                       c.heure,
                       c.duree,
                       c.categorie,
                       c.scene,
                       c.type_place,
                       c.prix_place,
                       c.image
                FROM panier_concert pc
                JOIN Concert c ON pc.concert_id = c.id
                WHERE pc.id = $1`;
            joinRes = await client.query(joinQuery, [panier_item_id]);
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
        console.error("Erreur dans decrementNbPlacesInPanier :", error);
        return { error: "Erreur interne du serveur" };
    } finally {
        client.release();
    }
}

async function viderPlacesInPanier(panier_item_id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        console.log(panier_item_id)
        // 1. On récupère l'entrée dans le panier pour connaître le concert et les places
        const selectCartQuery = 'SELECT concert_id, nb_places_panier FROM panier_concert WHERE id = $1';
        const cartRes = await client.query(selectCartQuery, [panier_item_id]);
        if (cartRes.rowCount === 0) {
            await client.query('ROLLBACK');
            return { error: "Le concert n'est pas dans le panier" };
        }

        const { concert_id, nb_places_panier } = cartRes.rows[0];

        // 2. On remet les places dans le stock du concert
        const updateStockQuery = 'UPDATE Concert SET nb_places = nb_places + $1 WHERE id = $2 RETURNING nb_places';
        await client.query(updateStockQuery, [nb_places_panier, concert_id]);

        // 3. On supprime l'élément du panier
        const deleteCartQuery = 'DELETE FROM panier_concert WHERE id = $1';
        await client.query(deleteCartQuery, [panier_item_id]);

        // 4. On renvoie les informations utiles (optionnel, selon ton besoin)
        await client.query('COMMIT');
        return { success: "Concert retiré du panier et places remises dans le stock" };

    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Erreur dans viderPlacesInPanier :", error);
        return { error: "Erreur interne du serveur" };
    } finally {
        client.release();
    }
}


module.exports = {
    insertConcert,
    getConcerts,
    updateConcert,
    deleteConcert,
    getPanier,
    insertConcertInPanier,
    viderPlacesInPanier,
    decrementNbPlacesInPanier
}