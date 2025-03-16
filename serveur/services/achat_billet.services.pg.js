const pool = require('../database/db');
const format = require('pg-format');

async function acheterBillet(utilisateurId, activiteId) {
    const client = await pool.connect();
    let isError = false;

    try {
        await client.query("BEGIN");

        const soldeQuery = format(
            "SELECT solde FROM Utilisateur WHERE id = %L",
            utilisateurId
        );
        const soldeResult = await client.query(soldeQuery);

        const   activiteNom = format(
            "SELECT nom FROM Activite WHERE id = %L", 
            activiteId
        );
        const nameActivite = await client.query(activiteNom);

        if (soldeResult.rows.length === 0) {
            throw new Error("Utilisateur non trouvé");
        }
        const soldeUtilisateur = soldeResult.rows[0].solde;

        const activiteQuery = format(
            "SELECT prix, places_disponibles FROM Activite WHERE id = %L",
            activiteId
        );
        const activiteResult = await client.query(activiteQuery);

        if (activiteResult.rows.length === 0) {
            throw new Error("Activité non trouvée");
        }
        const { prix, places_disponibles } = activiteResult.rows[0];

        if (soldeUtilisateur < prix) {
            throw new Error("Solde insuffisant");
        }

        if (places_disponibles <= 0) {
            throw new Error("Aucune place disponible");
        }

        const updateSoldeQuery = format(
            "UPDATE Utilisateur SET solde = solde - %L WHERE id = %L",
            prix,
            utilisateurId
        );
        await client.query(updateSoldeQuery);

        const updatePlacesQuery = format(
            "UPDATE Activite SET places_disponibles = places_disponibles - 1 WHERE id = %L",
            activiteId
        );
        await client.query(updatePlacesQuery);

        const billetData = [[new Date(), utilisateurId, activiteId]];
        const billetQuery = format(
            "INSERT INTO Billet_activite (date_achat, utilisateur_id, activite_id) VALUES %L",
            billetData
        );
        await client.query(billetQuery);

        const transactionData = [
            [new Date(), 'Achat Billet Activité', `Achat d'un billet pour l'activité ${nameActivite.rows[0]["nom"]} - Prix : ${prix}€`, prix, utilisateurId]
        ];
        const transactionQuery = format(
            "INSERT INTO Transaction (date, operation, details, montant, utilisateur_id) VALUES %L",
            transactionData
        );
        await client.query(transactionQuery);

        await client.query("COMMIT");

        console.log("Billet acheté avec succès");
        return "Billet acheté avec succès";
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Erreur lors de l'achat du billet :", error.message);
        isError = true;
        throw error;
    } finally {
        client.release();
    }
    return isError;
};

async function getBilletsFestival() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM billet_festival');
        console.log('RECUPERATION DES Billets du festival');
    } catch (error) {
        console.error('Erreur lors de la récupération des billets du festival :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}



module.exports = { acheterBillet, getBilletsFestival };