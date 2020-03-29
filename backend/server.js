// donenv load .env file variables
require('dotenv').config();

const express = require('express')
const pool = require('./connect')

const app = express()
const port = process.env.PORT

app.get('/', (req, res) => res.send('backend is up and running!'))

app.get('/produtos', (req, res) => {
    pool.query('SELECT ID, NOME FROM PRODUTO', (error, result) => {
        if (error) throw error;
        res.send(result);
    })
})

app.listen(port, () => console.log(`backend listening on port ${port}!`))