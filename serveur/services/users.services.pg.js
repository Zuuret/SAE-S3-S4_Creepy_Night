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

async function getUsers() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM Utilisateur');
        return res.rows;
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    insertUser,
    getUsers
}