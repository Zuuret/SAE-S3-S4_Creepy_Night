const pool = require('../database/db');
const format = require('pg-format');

async function buyTicketCauchemarathon(idUser, nbBillets, price, dateCourse, nomCourse) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const totalPrice = price;

        const soldeQuery = 'SELECT solde FROM Utilisateur WHERE id = $1';
        const soldeRes = await client.query(soldeQuery, [idUser]);
        if (soldeRes.rows.length === 0) {
            throw new Error("Utilisateur introuvable");
        }
        const soldeActuel = soldeRes.rows[0].solde;
        if (soldeActuel < totalPrice) {
            throw new Error("Solde insuffisant");
        }

        const courseQuery = `
        UPDATE course_cauchemarathon
        SET nb_places = nb_places - $1
        WHERE nom = $2 AND date = $3 AND nb_places >= $1
        RETURNING *
        `;
        const courseRes = await client.query(courseQuery, [nbBillets, nomCourse, dateCourse]);
        if (courseRes.rowCount === 0) {
            throw new Error("Pas assez de places disponibles");
        }

        const insertResQuery = `
          INSERT INTO reservations_cauchemarathon (utilisateur_id, id_course, nb_places)
          VALUES ($1, (
            SELECT id FROM Course_cauchemarathon 
            WHERE nom = $2 AND date = $3 LIMIT 1
          ), $4)
          RETURNING *
        `;
        const reservationRes = await client.query(insertResQuery, [idUser, nomCourse, dateCourse, nbBillets]);
        if (reservationRes.rowCount === 0) {
            throw new Error("Erreur lors de l'insertion de la réservation");
        }

        const updateSoldeQuery = `
          UPDATE Utilisateur
          SET solde = solde - $1
          WHERE id = $2
          RETURNING solde
        `;
        const updateSoldeRes = await client.query(updateSoldeQuery, [totalPrice, idUser]);

        const insertTransactionQuery = `
          INSERT INTO Transaction (date, operation, details, montant, utilisateur_id)
          VALUES (NOW(), 'Achat CaucheMarathon', $1, $2, $3)
          RETURNING *
        `;
        const detailsText = `${nbBillets} billet(s) pour ${nomCourse}`;
        const transactionRes = await client.query(insertTransactionQuery, [detailsText, -totalPrice, idUser]);

        await client.query('COMMIT');
        return {
            status: 200,
            reservation: reservationRes.rows[0],
            solde: updateSoldeRes.rows[0].solde,
            transaction: transactionRes.rows[0]
        };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Erreur dans buyTicketCauchemarathon :", error);
        return { status : 400, error: error.message };
    } finally {
        client.release();
    }
}

module.exports = {
    buyTicketCauchemarathon
};
