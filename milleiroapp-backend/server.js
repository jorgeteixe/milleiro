// donenv load .env file variables
// require('dotenv').config()

const async = require('async');
const bodyParser = require('body-parser')
const express = require('express')
const pool = require('./connect')
const queries = require('./queries')
const cors = require('cors')
 
const app = express()
const port = process.env.PORT
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => res.send('milleiroapp-backend is up and running!'))

app.get('/ref/:ref', (req, res) => {
    const ref = req.params.ref;
    var produto = {nome: '', descricion: '', preparacion: [], ingredentes: [], trazas: []};
    async.parallel([
        (callback) => {
            pool.query(queries.PRODUTO, ref, (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(400).send(error);
                } else {
                    if (result[0]) {
                        produto.nome = result[0].nome;
                        produto.descricion = result[0].descricion;
                    } else {
                        res.sendStatus(404);
                    }
                }
                return callback(error, result);
            });
        },
        (callback) => {
            pool.query(queries.PREPARACION, ref, (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(400).send(error);
                } else {
                    result.forEach(p => {
                        produto.preparacion.push({numero: p.numero, texto: p.texto});
                    });
                }
                return callback(error, result);
            })
        },
        (callback) => {
            pool.query(queries.INGREDENTES, ref, (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(400).send(error);
                } else {
                    result.forEach(i => {
                        produto.ingredentes.push({nome: i.nome, cantidade: i.cantidade, unidade: i.unidade});
                    });
                }
                return callback(error, result);
            });
        },
        (callback) => {
            pool.query(queries.TRAZAS, ref, (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(400).send(error);
                } else {
                    result.forEach(t => {
                        produto.trazas.push({numero: t.numero, nome: t.nome, data: t.data, localizacion: t.localizacion, latitude: t.latitude, lonxitude: t.lonxitude});
                    });
                }
                return callback(error, result);
            });
        }
    ], (error, result) => {
        if(!res.headersSent) {
            res.send(produto);
        }
    });
    
})

app.listen(port, () => console.log(`backend listening on port ${port}!`))
