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
    });
});

app.get('/grafico/dataset/:id', (req, res) => {
    const id = req.params.id
    pool.query(queries.DATASET_POR_ID, id, (error, result) => {
        if (error) throw error;
        res.send(result[0]);
    });
});

app.post('/produto/engadir', (req, res) => {
    var produto = JSON.parse(JSON.stringify(req.body));
    pool.query(queries.INSERT_PRODUTO, [produto.nome, produto.descricion], (error, result) => {
        if (error) throw error;
        var insetedId = { insetedId: result.insertId };
        console.log('Insertado produto: result = ' + JSON.stringify(insetedId));
        res.status(200).send(insetedId);
    });
});

app.post('/produto/:id/ingredentes/engadir', (req, res) => {
    const id = req.params.id
    var ingredente = JSON.parse(JSON.stringify(req.body));
    pool.query(queries.INSERT_INGREDIENTE, [id, ingredente.nome, ingredente.cantidade, ingredente.unidade], (error, result) => {
        if (error) throw error;
        console.log('Insertado ingredente para prod id = ' + id);
        res.status(200).send(result)
    });
});

app.post('/produto/:id/preparacion/engadir', (req, res) => {
    const id = req.params.id
    var preparacion = JSON.parse(JSON.stringify(req.body));
    pool.query(queries.INSERT_PREPARACION, [id, preparacion.numero, preparacion.texto], (error, result) => {
        if (error) throw error;
        console.log('Insertada preparación para prod id = ' + id);
        res.status(200).send(result)
    });
});

app.post('/produto/:id/traza/engadir', (req, res) => {
    const id = req.params.id
    var traza = JSON.parse(JSON.stringify(req.body));
    pool.query(queries.INSERT_TRAZA, [id, traza.numero, traza.nome], (error, result) => {
        if (error) throw error;
        console.log('Insertada traza para prod id = ' + id);
        res.status(200).send(result)
    });
});

app.get('/produtos/lista/trazados', (req, res) => {
    pool.query(queries.LISTA_TRAZADOS, (error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

app.get('/produtos/lista/sintrazar', (req, res) => {
    pool.query(queries.LISTA_SIN_TRAZAR, (error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

app.listen(port, () => console.log(`backend-manage listening on port ${port}!`));