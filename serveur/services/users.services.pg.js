const pool = require('../database/db');

async function insertUser(name, email, phone, password) {
    const client = await pool.connect();
    is_error = false;
    try {
        const data = [
            [name, email, phone, password]
        ]
        const query = format('INSERT INTO users (name, email, phone, password) VALUES %L', data);
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