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

async function insertConcertInPanier(concert, utilisateur_id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const requeteNbPlaces = 'SELECT nb_places FROM Concert WHERE id = $1';
        const resultatPlaces = await client.query(requeteNbPlaces, [concert.id]);
        if (resultatPlaces.rowCount === 0) {
            await client.query('ROLLBACK');
            return { error: "Concert non trouvé" };
        }
        const nbPlacesDisponibles = resultatPlaces.rows[0].nb_places;
        if (nbPlacesDisponibles <= 0) {
            await client.query('ROLLBACK');
            return { error: "Nombre de places insuffisant" };
        }
        const requeteSelection = `SELECT id, nb_places_panier FROM panier_concert 
                                         WHERE concert_id = $1 AND utilisateur_id = $2`;
        const resultatSelection = await client.query(requeteSelection, [concert.id, utilisateur_id]);
        let lignePanier;
        if (resultatSelection.rowCount > 0) {
            const requeteMaj = `UPDATE panier_concert SET nb_places_panier = nb_places_panier + 1 
                                       WHERE concert_id = $1 AND utilisateur_id = $2 
                                       RETURNING id`;
            const resultatMaj = await client.query(requeteMaj, [concert.id, utilisateur_id]);
            lignePanier = resultatMaj.rows[0];
        } else {
            const requeteInsertion = `INSERT INTO panier_concert (utilisateur_id, concert_id, nb_places_panier) 
            VALUES ($1, $2, 1) 
            RETURNING id`;
            const resultatInsertion = await client.query(requeteInsertion, [utilisateur_id, concert.id]);
            lignePanier = resultatInsertion.rows[0];
        }
        const requeteDecrementStock = `UPDATE Concert 
                                              SET nb_places = nb_places - 1 
                                              WHERE id = $1 
                                              RETURNING nb_places`;
        await client.query(requeteDecrementStock, [concert.id]);
        const requeteJoin = `SELECT pc.id AS panier_id, pc.nb_places_panier, pc.utilisateur_id,
                c.id AS concert_id, c.artiste, c.nationalite, c.date, c.heure, c.duree, c.categorie, c.scene,
                c.type_place, c.prix_place, c.image
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

async function incrementNbPlacesInPanier(panier_item_id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const selectCartQuery = 'SELECT concert_id, nb_places_panier FROM panier_concert WHERE id = $1';
        const cartRes = await client.query(selectCartQuery, [panier_item_id]);
        if (cartRes.rowCount === 0) {
            await client.query('ROLLBACK');
            return { error: "Le concert n'est pas dans le panier" };
        }
        const { concert_id } = cartRes.rows[0];

        const stockQuery = 'SELECT nb_places FROM Concert WHERE id = $1';
        const stockRes = await client.query(stockQuery, [concert_id]);
        if (stockRes.rowCount === 0) {
            await client.query('ROLLBACK');
            return { error: "Concert non trouvé" };
        }
        if (stockRes.rows[0].stock <= 0) {
            await client.query('ROLLBACK');
            return { error: "Nombres de places insuffisantes" };
        }

        const updateCartQuery = 'UPDATE panier_concert SET nb_places_panier = nb_places_panier + 1 WHERE id = $1 RETURNING *';
        const updateRes = await client.query(updateCartQuery, [panier_item_id]);

        const decrementStockQuery = 'UPDATE Concert SET nb_places = nb_places - 1 WHERE id = $1 RETURNING stock';
        await client.query(decrementStockQuery, [concert_id]);

        const joinQuery = `
      SELECT pc.id AS panier_id, pc.nb_places_panier, pc.utilisateur_id,
            c.id AS concert_id, c.artiste, c.nationalite, c.date, c.heure, c.duree, c.categorie, c.scene,
            c.type_place, c.prix_place, c.image
        FROM panier_concert pc
        JOIN Concert c ON pc.concert_id = c.id
        WHERE pc.id = $1`;
        const joinRes = await client.query(joinQuery, [panier_item_id]);

        await client.query('COMMIT');
        return joinRes.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Erreur dans incrementNbPlacesInPanier :", error);
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
                WHERE pc.id = $1\`;
      `;
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

module.exports = {
    insertConcert,
    getConcerts,
    updateConcert,
    deleteConcert,
    insertConcertInPanier,
    incrementNbPlacesInPanier,
    decrementNbPlacesInPanier
}