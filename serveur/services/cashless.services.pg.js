const pool = require('../database/db');

async function updateFunds(idUser, amount, operation, details) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Mise à jour du solde de l'utilisateur
        const updateQuery = 'UPDATE Utilisateur SET solde = solde + $1 WHERE id = $2 RETURNING solde';
        const updateRes = await client.query(updateQuery, [amount, idUser]);
        if (updateRes.rowCount === 0) {
            await client.query('ROLLBACK');
            return null;
        }
        const newSolde = updateRes.rows[0].solde;

        // Enregistrement de la transaction
        const transactionQuery = `
      INSERT INTO Transaction (date, operation, details, montant, utilisateur_id)
      VALUES (NOW(), $1, $2, $3, $4)
      RETURNING *
    `;
        const transactionRes = await client.query(transactionQuery, [operation, details, amount, idUser]);

        await client.query('COMMIT');
        return { newSolde, transaction: transactionRes.rows[0] };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Erreur dans updateFunds :", error);
        return null;
    } finally {
        client.release();
    }
}


async function checkBankCard(nom, numeroCarte, dateExpiration, cvv) {
    const client = await pool.connect();
    try {
        const query = `
      SELECT *
      FROM coordonnees_bancaire
      WHERE nom = $1 
        AND numero_carte = $2 
        AND date_expiration = $3 
        AND cvv = $4
    `;
        const result = await client.query(query, [nom, numeroCarte, dateExpiration, cvv]);
        // Si au moins une ligne est trouvée, la carte est validée
        return result.rowCount > 0;
    } catch (error) {
        console.error("Erreur dans checkBankCard :", error);
        return false;
    } finally {
        client.release();
    }
}

module.exports = {
    updateFunds,
    checkBankCard
};
