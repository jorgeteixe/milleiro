// donenv load .env file variables
require('dotenv').config();

const express = require('express')

const app = express()
const port = process.env.PORT

app.get('/', (req, res) => res.send('Hello World!'))

app.all('/ping', (req, res) => res.send(new Date()))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))