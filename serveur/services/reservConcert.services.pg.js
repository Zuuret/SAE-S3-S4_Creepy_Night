const pool = require('../database/db');
const format = require('pg-format');

async function insertReservConcert(id, utilisateur_id, concert_id, nb_places, date_reservation) {
    const client = await pool.connect();
    let is_error = false;
    try {
        await client.query('BEGIN');

        // 1. Récupérer les infos du concert
        const concertQuery = 'SELECT prix_place, artiste, nb_places FROM Concert WHERE id = $1 FOR UPDATE';
        const concertRes = await client.query(concertQuery, [concert_id]);
        
        if (concertRes.rowCount === 0) {
            throw new Error('Concert non trouvé');
        }
        
        const prixPlace = concertRes.rows[0].prix_place;
        const artiste = concertRes.rows[0].artiste;
        const placesDisponibles = concertRes.rows[0].nb_places;
        const montantTotal = prixPlace * nb_places;

        // 2. Vérifier qu'il y a assez de places
        if (placesDisponibles < nb_places) {
            throw new Error('Places insuffisantes');
        }

        // 3. Décrémenter le stock
        const updateStockQuery = 'UPDATE Concert SET nb_places = nb_places - $1 WHERE id = $2';
        await client.query(updateStockQuery, [nb_places, concert_id]);

        // 4. Insérer la réservation
        const insertQuery = `
            INSERT INTO reservation_concert (id, utilisateur_id, concert_id, nb_places, date_reservation) 
            VALUES ($1, $2, $3, $4, $5)
        `;
        await client.query(insertQuery, [id, utilisateur_id, concert_id, nb_places, date_reservation]);

        // 5. Enregistrer la transaction
        const transactionQuery = `
            INSERT INTO Transaction (date, operation, details, montant, utilisateur_id)
            VALUES (NOW(), 'RESERVATION_CONCERT', $1, $2, $3)
        `;
        const details = `Réservation ${nb_places} place(s) pour ${artiste}`;
        await client.query(transactionQuery, [details, -montantTotal, utilisateur_id]);

        // 6. Mettre à jour le solde de l'utilisateur
        const updateSoldeQuery = 'UPDATE Utilisateur SET solde = solde - $1 WHERE id = $2';
        await client.query(updateSoldeQuery, [montantTotal, utilisateur_id]);

        await client.query('COMMIT');
        console.log('RÉSERVATION, TRANSACTION ET MISE À JOUR DU STOCK EFFECTUÉES AVEC SUCCÈS');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Erreur : ', error);
        is_error = error.message; // On retourne maintenant le message d'erreur
    } finally {
        client.release();
    }
    return is_error;
}

async function getReservConcert() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM reservation_concert');
        console.log('RECUPERATION DES RESERVATIONS DE CONCERT');
    } catch (error) {
        console.error('Erreur lors de la récupération des réservations :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function updateReservConcert(id, utilisateur_id, concert_id, nb_places, date_reservation) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('UPDATE Concert SET utilisateur_id = %L, concert_id = %L, nb_places = %L, date_reservation = %L WHERE id = %L', utilisateur_id, concert_id, nb_places, date_reservation, id);
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

async function deleteReservConcert(id) {
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

module.exports = {
    insertReservConcert,
    getReservConcert,
    updateReservConcert,
    deleteReservConcert
}