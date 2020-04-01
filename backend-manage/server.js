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
    res.status(200).send('11'); 
});

app.post('/produto/:id/ingredentes/engadir', (req, res) => {
    const id = req.params.id
    var ingredente = JSON.parse(JSON.stringify(req.body));
    console.log(ingredente.nome);
    res.send('200');
});

app.post('/produto/:id/preparacion/engadir', (req, res) => {
    const id = req.params.id
    var preparacion = JSON.parse(JSON.stringify(req.body));
    console.log(preparacion.texto);
    res.send('200');
});



app.listen(port, () => console.log(`backend-manage listening on port ${port}!`));