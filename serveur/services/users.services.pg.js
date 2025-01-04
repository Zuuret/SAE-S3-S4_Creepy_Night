const pool = require('../database/db');
const format = require('pg-format');

async function insertUser(id,name,firstname,birthdate,email,password,solde,num_cashless,qr_code,est_festivalier) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [id, name, firstname, birthdate, email, password, solde, num_cashless, qr_code, est_festivalier]
        ]
        const query = format('INSERT INTO utilisateur (id,nom,prenom,date_naissance,mail,password,solde,num_cashless,qr_code,est_festivalier) VALUES %L', data);
        await client.query(query);
        console.log('INSERTIONS AVEC SUCCES');
    } catch (error) {
        console.error('Erreur : ', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

module.exports = {
    insertUser
}