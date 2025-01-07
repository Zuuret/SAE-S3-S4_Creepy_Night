const pool = require('../database/db');
const format = require('pg-format');

async function acheterBillet(utilisateurId, activiteId) {
    const client = await pool.connect();
    let isError = false;

    try {
        // Début d'une transaction
        await client.query("BEGIN");

        // Vérifier le solde de l'utilisateur
        const soldeQuery = format(
            "SELECT solde FROM Utilisateur WHERE id = %L",
            utilisateurId
        );
        const soldeResult = await client.query(soldeQuery);

        if (soldeResult.rows.length === 0) {
            throw new Error("Utilisateur non trouvé");
        }
        const soldeUtilisateur = soldeResult.rows[0].solde;

        // Vérifier les informations de l'activité
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

        // Mettre à jour le solde de l'utilisateur
        const updateSoldeQuery = format(
            "UPDATE Utilisateur SET solde = solde - %L WHERE id = %L",
            prix,
            utilisateurId
        );
        await client.query(updateSoldeQuery);

        // Réduire le nombre de places disponibles
        const updatePlacesQuery = format(
            "UPDATE Activite SET places_disponibles = places_disponibles - 1 WHERE id = %L",
            activiteId
        );
        await client.query(updatePlacesQuery);

        // Insérer un billet dans la table Billet_activite
        const billetData = [[new Date(), utilisateurId, activiteId]];
        const billetQuery = format(
            "INSERT INTO Billet_activite (date_achat, utilisateur_id, activite_id) VALUES %L",
            billetData
        );
        await client.query(billetQuery);

        // Valider la transaction
        await client.query("COMMIT");

        console.log("Billet acheté avec succès");
        return "Billet acheté avec succès";
    } catch (error) {
        // Annuler la transaction en cas d'erreur
        await client.query("ROLLBACK");
        console.error("Erreur lors de l'achat du billet :", error.message);
        isError = true;
        throw error;
    } finally {
        client.release();
    }
    return isError;
};

module.exports = { acheterBillet };