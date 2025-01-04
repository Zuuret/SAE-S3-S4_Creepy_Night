const pool = require('../database/db');

async function insertUser(id,name,firstname,birthdate,email,password,solde,num_cashless,qr_code,est_festivalier) {
    const client = await pool.connect();
    is_error = false;
    try {
        const data = [
            [id, name, firstname, birthdate, email, password, solde, num_cashless, qr_code, est_festivalier]
        ]
        const query = format('INSERT INTO utilisateur (id,name,firstname,birthdate,email,password,solde,num_cashless,qr_code,est_festivalier) VALUES %L', data);
        await client.query(query);
        console.log('INSERTIONS AVEC SUCCES');
    } catch (error) {
        console.error('Erreur : ', error);
    } finally {
        is_error = true;
        client.release();
    }
    return is_error;
}

module.exports = {
    insertUser
}