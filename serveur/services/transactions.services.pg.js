const format = require("pg-format");
const pool = require('../database/db');

async function getHistoriqueTransactions(utilisateurId) {
    const client = await pool.connect();
    let transactions = [];
    //console.log(utilisateurId)
    try {
        const query = format(`
                    SELECT t.id, 
                           t.date, 
                           t.montant, 
                           t.details,
                           CASE
                               WHEN ba.activite_id IS NOT NULL THEN 'Activité'
                               WHEN rp.prestation_id IS NOT NULL THEN 'Prestation'
                               WHEN bf.evenement_id IS NOT NULL THEN 'Festival'
                               ELSE 'Autre'
                           END AS categorie,
                           ba.activite_id AS activite,
                           rp.prestation_id AS prestation,
                           bf.evenement_id AS evenement
                    FROM Transaction t
                    LEFT JOIN Billet_activite ba ON t.utilisateur_id = ba.utilisateur_id AND ba.activite_id IS NOT NULL
                    LEFT JOIN Reservation_prestation rp ON t.utilisateur_id = rp.utilisateur_id AND rp.prestation_id IS NOT NULL
                    LEFT JOIN Billet_festival bf ON t.utilisateur_id = bf.utilisateur_id AND bf.evenement_id IS NOT NULL
                    WHERE t.utilisateur_id = %L
                    ORDER BY t.date DESC;
        `, utilisateurId);

        const result = await client.query(query);
        transactions = result.rows;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'historique des transactions :", error);
        throw new Error("Erreur lors de la récupération des transactions");
    } finally {
        client.release();
    }
    return transactions;
}

module.exports = { getHistoriqueTransactions };
