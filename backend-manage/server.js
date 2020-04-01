// donenv load .env file variables
require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const pool = require('./connect')
const queries = require('./queries')
const cors = require('cors')

const app = express()
const port = process.env.PORT

app.use(bodyParser.json())

app.use(cors())

app.get('/', (req, res) => res.send('backend-manage is up and running!'))

app.get('/grafico/produtos', (req, res) => {
    pool.query(queries.PRODUTOS_CON_TRAZA, (error, result) => {
        if (error) throw error;
        res.send(result);
    })
})

app.get('/grafico/dataset/:id', (req, res) => {
    const id = req.params.id
    pool.query(queries.DATASET_POR_ID, id, (error, result) => {
        if (error) throw error;
        res.send(result[0]);
    })
})

app.post('/produto/engadir', (req, res) => {
    console.log(req.body);      // your JSON
    res.sendStatus(200);    // echo the result back
});

app.post('/produto/:id/ingredentes/engadir', (req, res) => {
    const id = req.params.id
    console.log(id);      // url id
    console.log(req.body);      // your JSON
    res.sendStatus(200);    // echo the result back
});

app.post('/produto/:id/preparacion/engadir', (req, res) => {
    const id = req.params.id
    console.log(id);      // url id
    console.log(req.body);      // your JSON
    res.sendStatus(200);    // echo the result back
});



app.listen(port, () => console.log(`backend-manage listening on port ${port}!`))