const pool = require('../database/db');
const format = require('pg-format');

async function signalerIncident(utilisateurId, typeIncident, description, zoneId, position) {
    const client = await pool.connect();
    let isError = false;

    try {
        await client.query("BEGIN");

        const zoneQuery = format(
            "SELECT id FROM Zone WHERE id = %L",
            zoneId
        );
        const zoneResult = await client.query(zoneQuery);

        if (zoneResult.rows.length === 0) {
            throw new Error("Zone non trouvée");
        }

        const signalementData = [
            [typeIncident, description, zoneId, position, new Date()]
        ];
        const signalementQuery = format(
            "INSERT INTO Signalement (typeIncident, description, zone, position, date) VALUES %L",
            signalementData
        );
        await client.query(signalementQuery);

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

        const organisateurs = organisateursResult.rows.map(org => ({
            id: org.id,
            nom: org.nom,
            prenom: org.prenom,
            email: org.email
        }));

        await client.query("COMMIT");

        return organisateurs;
    } catch (error) {
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
