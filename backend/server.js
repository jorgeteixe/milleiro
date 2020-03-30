// donenv load .env file variables
require('dotenv').config()

const express = require('express')
const pool = require('./connect')
const queries = require('./queries')
const cors = require('cors')
 
const app = express()
const port = process.env.PORT
app.use(cors())

app.get('/', (req, res) => res.send('backend is up and running!'))

app.get('/produtos', (req, res) => {
    pool.query(queries.PRODUCT_LIST_SIMPLE, (error, result) => {
        if (error) throw error;
        res.send(result);
    })
})

app.get('/produto/:id', (req, res) => {
    const id = req.params.id;
    pool.query(queries.PRODUCT_SIMPLE_BY_ID, id, (error, result) => {
        if (error) throw error;
        res.send(result);
    })
})

app.get('/produto/:id/reflist', (req, res) => {
    const id = req.params.id;
    pool.query(queries.REFLIST_QUERY, [id, id], (error, result) => {
        if (error) throw error;
        res.send(result);
    })
})

app.get('/ref/:ref/traza', (req, res) => {
    const ref = req.params.ref;
    pool.query(queries.REF_TRAZAS, ref, (error, result) => {
        if (error) throw error;
        res.send(result);
    })
})

app.get('/ref/:ref/produto', (req, res) => {
    const ref = req.params.ref;
    pool.query(queries.PRODUTO_BY_REF, ref, (error, result) => {
        if (error) throw error;
        res.send(result);
    })
})

app.listen(port, () => console.log(`backend listening on port ${port}!`))