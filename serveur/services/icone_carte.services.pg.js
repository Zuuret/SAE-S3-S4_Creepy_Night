const pool = require('../database/db');
const format = require('pg-format');

async function getIcone() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM icone_carte');
        console.log('ICONES RECUPERES'); 
    } catch (error) {
        console.error('Erreur lors de la récupération de l icone :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || [];
}

module.exports = {
    getIcone,
};