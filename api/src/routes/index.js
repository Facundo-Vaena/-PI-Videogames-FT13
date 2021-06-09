const { Router } = require('express');
const express = require('express');
const { default: fetch } = require('node-fetch');
const app = express();
const videogames = require('./videogamesRoute');
const genres = require('./genresRoute');
const Sequelize = require('sequelize');
const { conn } = require('../db');
const { Genre } = require('../db.js')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

app.use(express.json());

router.use('/videogames', videogames);

router.use('/genres', genres )








// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
