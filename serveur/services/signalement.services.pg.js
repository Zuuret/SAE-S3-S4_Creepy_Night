const pool = require('../database/db');
const format = require('pg-format');

async function signalerIncident(utilisateurId, typeIncident, description, zoneId, position) {
    const client = await pool.connect();
    let isError = false;

    try {
        // Début de la transaction
        await client.query("BEGIN");

        // Vérifier si la zone existe
        const zoneQuery = format(
            "SELECT id FROM Zone WHERE id = %L",
            zoneId
        );
        const zoneResult = await client.query(zoneQuery);

        if (zoneResult.rows.length === 0) {
            throw new Error("Zone non trouvée");
        }

        // Ajouter le signalement dans la table Signalement
        const signalementData = [
            [typeIncident, description, zoneId, position, new Date()]
        ];
        const signalementQuery = format(
            "INSERT INTO Signalement (typeIncident, description, zone, position, date) VALUES %L",
            signalementData
        );
        await client.query(signalementQuery);

        // Identifier les organisateurs responsables de la zone via la table `organise`
        const organisateursQuery = format(
            "SELECT o.id, o.nom, o.prenom, o.email FROM Organisateur o " +
            "JOIN organise org ON o.id = org.organisateur_id " +
            "WHERE org.activite_id IN (SELECT a.id FROM Activite a WHERE a.zone_id = %L)",
            zoneId
        );
        const organisateursResult = await client.query(organisateursQuery);

        if (organisateursResult.rows.length === 0) {
            throw new Error("Aucun organisateur responsable de cette zone");
        }

        // Extraire les informations des organisateurs
        const organisateurs = organisateursResult.rows.map(org => ({
            id: org.id,
            nom: org.nom,
            prenom: org.prenom,
            email: org.email
        }));

        // Valider la transaction
        await client.query("COMMIT");

        return organisateurs; // Retourner la liste des organisateurs à notifier
    } catch (error) {
        // Annuler la transaction en cas d'erreur
        await client.query("ROLLBACK");
        console.error("Erreur lors du signalement de l'incident :", error.message);
        isError = true;
        throw error;
    } finally {
        client.release();
    }

    return isError;
}

module.exports = {
    signalerIncident
};
