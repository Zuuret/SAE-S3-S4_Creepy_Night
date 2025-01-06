const pool = require('../database/db');
const format = require('pg-format');

async function insertUser(id,name,firstname,birthdate,email,password,solde,num_cashless,qr_code,est_festivalier) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [id, name, firstname, birthdate, email, password, solde, num_cashless, qr_code, est_festivalier]
        ]
        const query = format('INSERT INTO Utilisateur (id,nom,prenom,date_naissance,mail,password,solde,num_cashless,qr_code,est_festivalier) VALUES %L', data);
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
    let res;
    try {
        res = await client.query('SELECT * FROM Utilisateur');
        console.log('RECUPERATION DES UTILISATEURS');
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function updateUser(uuid, name, firstname, birthdate, email, password, est_festivalier) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('UPDATE Utilisateur SET nom = %L, prenom = %L, date_naissance = %L, mail = %L, password = %L, est_festivalier = %L WHERE id = %L', name, firstname, birthdate, email, password, est_festivalier, uuid);
        await client.query(query);
        console.log('MISE A JOUR DE L\'UTILISATEUR');
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

async function deleteUser(uuid) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('DELETE FROM utilisateur WHERE uuid = $1 RETURNING *',uuid);
        await client.query(query);
        console.log('SUPPRESSION DE L\'UTILISATEUR');
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

module.exports = {
    insertUser,
    getUsers,
    updateUser,
    deleteUser
}