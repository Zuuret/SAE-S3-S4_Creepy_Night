const pool = require('./database/db.js');

async function getUsers() {
    const client = await pool.connect()
    const res = await client.query('SELECT * FROM Utilisateur')
    console.log(res.rows)
    client.release()
}

getUsers()