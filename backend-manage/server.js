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
        if (error) console.log(error);
        res.send(result);
    });
});

app.get('/grafico/dataset/:id', (req, res) => {
    const id = req.params.id
    pool.query(queries.DATASET_POR_ID, id, (error, result) => {
        if (error) console.log(error);
        res.send(result[0]);
    });
});

app.post('/produto/engadir', (req, res) => {
    var produto = JSON.parse(JSON.stringify(req.body));
    pool.query(queries.INSERT_PRODUTO, [produto.nome, produto.descricion], (error, result) => {
        if (error) console.log(error);
        var insetedId = { insetedId: result.insertId };
        console.log('Insertado produto: result = ' + JSON.stringify(insetedId));
        res.status(200).send(insetedId);
    });
});

app.post('/produto/:id/ingredentes/engadir', (req, res) => {
    const id = req.params.id
    var ingredente = JSON.parse(JSON.stringify(req.body));
    pool.query(queries.INSERT_INGREDIENTE, [id, ingredente.nome, ingredente.cantidade, ingredente.unidade], (error, result) => {
        if (error) console.log(error);
        console.log('Insertado ingredente para prod id = ' + id);
        res.status(200).send(result)
    });
});

app.post('/produto/:id/preparacion/engadir', (req, res) => {
    const id = req.params.id
    var preparacion = JSON.parse(JSON.stringify(req.body));
    pool.query(queries.INSERT_PREPARACION, [id, preparacion.numero, preparacion.texto], (error, result) => {
        if (error) console.log(error);
        console.log('Insertada preparación para prod id = ' + id);
        res.status(200).send(result)
    });
});

app.post('/produto/:id/traza/engadir', (req, res) => {
    const id = req.params.id
    var traza = JSON.parse(JSON.stringify(req.body));
    pool.query(queries.INSERT_TRAZA, [id, traza.numero, traza.nome], (error, result) => {
        if (error) console.log(error);
        console.log('Insertada traza para prod id = ' + id);
        res.status(200).send(result)
    });
});

app.get('/produtos/lista/trazados', (req, res) => {
    pool.query(queries.LISTA_TRAZADOS, (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get('/produtos/lista/sintrazar', (req, res) => {
    pool.query(queries.LISTA_SIN_TRAZAR, (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get('/produto/:id', (req, res) => {
    const id = req.params.id
    pool.query(queries.PRODUTO_BY_ID, id, (error, result) => {
        if (error) console.log(error);
        res.send(result[0]);
    });
});

app.get('/produto/:id/ingredentes', (req, res) => {
    const id = req.params.id
    pool.query(queries.INGREDENTES_BY_ID, id, (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get('/produto/:id/preparacion', (req, res) => {
    const id = req.params.id
    pool.query(queries.PREPARACION_BY_ID, id, (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get('/produto/:id/traza', (req, res) => {
    const id = req.params.id
    pool.query(queries.TRAZA_BY_ID, id, (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get('/produto/:id/referencias/contar', (req, res) => {
    const id = req.params.id
    pool.query(queries.REFERENCIAS_BY_ID, id, (error, result) => {
        if (error) console.log(error);
        res.send(result[0]);
    });
});

app.get('/produto/:id/trazas/contar', (req, res) => {
    const id = req.params.id
    pool.query(queries.NUMERO_TRAZAS_BY_ID, id, (error, result) => {
        if (error) console.log(error);
        res.send(result[0]);
    });
});

app.post('/contrasinal', (req, res) => {
    console.log('authenticating');
    var password = JSON.parse(JSON.stringify(req.body)).pwd;
    if(password == process.env.WEB_PASSWORD) {
        var resp = { status: 200 };
        res.send(resp);
    } else {
        var resp = { status: 403 };
        res.send(resp);
    }
}); 

app.get('/tokens', (req, res) => {
    pool.query(queries.TOKENS, (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.post('/tokens/engadir', (req, res) => {
    var token = JSON.parse(JSON.stringify(req.body));
    pool.query(queries.INSERT_TOKEN, [token.token, token.nome, token.activo], (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.delete('/produto/:id', (req, res) => {
    const id = req.params.id;
    pool.query(queries.DELETE_PRODUTO, id, (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.delete('/token/:tk', (req, res) => {
    const token = req.params.tk;
    pool.query(queries.DELETE_TOKEN, token, (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get('/token/:tk/activate', (req, res) => {
    const token = req.params.tk;
    pool.query(queries.ACTIVATE_TOKEN, token, (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get('/token/:tk/deactivate', (req, res) => {
    const token = req.params.tk;
    pool.query(queries.DEACTIVATE_TOKEN, token, (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.listen(port, () => console.log(`backend-manage listening on port ${port}!`));