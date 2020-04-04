// donenv load .env file variables
// require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const pool = require('./connect')
const queries = require('./queries')
const cors = require('cors')

const app = express()
const port = process.env.PORT

app.use(bodyParser.json())

app.use(cors())

app.get('/', (req, res) => res.send('backend-add-app is up and running!'))

app.get('/produtos', (req, res) => {
    pool.query(queries.LISTA_PRODUTOS, (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get('/produto/:id/trazas', (req, res) => {
    const id = req.params.id
    pool.query(queries.LISTA_TRAZAS_PROD, id, (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.post('/traza/engadir', (req, res) => {
    var traza = JSON.parse(JSON.stringify(req.body));
    var token = traza.token;
    var tokenvalido = false;
    pool.query(queries.COMPROBAR_TOKEN, token, (error, result) => {
        if (error) {
            console.log(error);
            res.sendStatus(404);
        } else {
            try {
                var activo = result[0].activo === 1
                if (activo) {
                    tokenvalido = true;
                }
                console.log(tokenvalido)
                if (tokenvalido) {
                    pool.query(queries.ADD_TRAZA, [traza.referencia, traza.traza_id, traza.fecha, traza.localizacion, traza.latitud, traza.longitud], (error, result) => {
                        if (error) {
                            console.log(error);
                            res.sendStatus(406);
                        } else {
                            res.sendStatus(201);
                        }
                    });
                } else {
                    res.sendStatus(403);
                }
            } catch (error) {
                res.sendStatus(403);
            }
            
        }
    });

});

app.listen(port, () => console.log(`backend-add-app listening on port ${port}!`));