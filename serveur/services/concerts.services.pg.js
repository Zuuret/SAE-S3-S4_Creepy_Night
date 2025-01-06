const pool = require('../database/db');
const format = require('pg-format');

async function insertConcert(artiste,nationalite,date,heure,duree,categorie,scene) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const data = [
            [artiste,nationalite,date,heure,duree,categorie,scene]
        ]
        const query = format('INSERT INTO Concert (artiste,nationalite,date,heure,duree,categorie,scene) VALUES %L', data);
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

async function getConcerts() {
    const client = await pool.connect();
    let res;
    try {
        res = await client.query('SELECT * FROM Concert');
        console.log('RECUPERATION DES CONCERTS');
    } catch (error) {
        console.error('Erreur lors de la récupération des concerts :', error);
        res = false;
    } finally {
        client.release();
    }
    return res.rows || false;
}

async function updateConcert(uuid,artiste,nationalite,date,heure,duree,categorie,scene) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('UPDATE Concert SET artiste = %L,nationalite = %L, date = %L, heure = %L, duree = %L, categorie = %L, scene = scene WHERE id = %L', artiste, nationalite,date,heure,duree,categorie,scene, uuid);
        await client.query(query);
        console.log('MISE A JOUR DU CONCERT');
    } catch (error) {
        console.error('Erreur lors de la mise à jour du concert :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

async function deleteConcert(uuid) {
    const client = await pool.connect();
    let is_error = false;
    try {
        const query = format('DELETE FROM Concert WHERE uuid = $1 RETURNING *',uuid);
        await client.query(query);
        console.log('SUPPRESSION DU CONCERT');
    } catch (error) {
        console.error('Erreur lors de la suppression du concert :', error);
        is_error = true;
    } finally {
        client.release();
    }
    return is_error;
}

module.exports = {
    insertConcert,
    getConcerts,
    updateConcert,
    deleteConcert
}