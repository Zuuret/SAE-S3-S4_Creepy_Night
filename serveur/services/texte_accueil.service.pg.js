const pool = require('../database/db');
const format = require('pg-format');

async function getTexteAccueil(lang = 'fr') {
    const client = await pool.connect();
    let res;
    try {
        const colonneTitre = lang === 'en' ? 'titre_en' : 'titre';
        const colonneContenu = lang === 'en' ? 'contenu_en' : 'contenu';

        res = await client.query(`
            SELECT ${colonneTitre} AS titre, ${colonneContenu} AS contenu
            FROM texte_accueil
            WHERE id = 1
        `);

        console.log(`TEXTE D'ACCUEIL RÉCUPÉRÉ POUR LA LANGUE : ${lang}`);
    } catch (error) {
        console.error('Erreur lors de la récupération du texte d\'accueil :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows?.[0] || false;
}

async function updateTexteAccueil(titre, contenu) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format(
            'UPDATE texte_accueil SET titre = %L, contenu = %L, date_maj = NOW() WHERE id = 1',
            titre,
            contenu
        );
        await client.query(query);
        console.log('TEXTE D\'ACCUEIL MIS À JOUR');
    } catch (error) {
        console.error('Erreur lors de la mise à jour du texte d\'accueil :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

module.exports = {
    getTexteAccueil,
    updateTexteAccueil
};