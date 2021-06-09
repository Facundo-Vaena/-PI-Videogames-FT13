const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { conn } = require('../db');
const Sequelize = require('sequelize');
const { Videogame } = require('../db.js')
const { v1: uuid, v1 } = require('uuid');

//  const API_KEY  = process.env.API_KEY;

router.use(express.json());

// apiKey ----> f94de48cdec544d2b0b550d320afe33a

router.get('/:idVideoGame', (req, res) => {
    //detalle del videojuego ingresado (id)
    fetch(`https://api.rawg.io/api/games/${req.params.idVideoGame}?key=f94de48cdec544d2b0b550d320afe33a`)
        .then(resp => resp.json())
        .then(resp => {
            var gameDetails = {};
            gameDetails.img = resp.background_image
            gameDetails.name = resp.name
            gameDetails.genres = resp.genres
            gameDetails.description = resp.description
            gameDetails.released = resp.released
            return gameDetails
        })
        .then(resp =>{
            !resp.name ? res.send('Videogame not found') :
            res.json(resp)
        })
        .catch(err => console.log(err));
    // try {
    //     const response = await fetch(`http://jsonplaceholder.typicode.com/users/4`)
    //     res.json(response)
    //   } catch(error){
    //       console.log("no");
    //   }



})

router.get('/', (req, res) => {
    //listado 1eros 15 juegos
    const { search } = req.query;
    if (!search) {
        return fetch(`https://api.rawg.io/api/games?key=f94de48cdec544d2b0b550d320afe33a`)
            .then(resp => resp.json())
            .then(resp => {

                var games = [];
                while (games.length !== 15) {
                    let game = {};

                    resp.results.forEach(e => {
                        game.name = e.name;
                        game.img = e.background_image;
                        game.genres = e.genres;


                    })
                    games.push(game)
                }
                return games

            })

            .then(resp => {
                res.json(resp)
            })

            .catch(err => console.log(err))
    }
    return fetch(`https://api.rawg.io/api/games?key=f94de48cdec544d2b0b550d320afe33a&search=${search}`)
        .then(resp => resp.json())
        .then(resp => {
            var games = [];
            while (games.length !== 15) {
                let game = {};
                resp.results.forEach(e => {
                    game.name = e.name;
                    game.img = e.background_image;
                    game.genres = e.genres;

                })
                games.push(game)
            }
            return games
        })
        .then(resp => {
            !resp[0].name ?  res.send('Videogame not found') :
             res.json(resp)
        })
        .catch(err => console.log(err))

})



router.post('/', (req, res) => {
    const { name, description, released, rating, platforms } = req.body;
    Videogame.create({
        id: v1(),
        name,
        description,
        released,
        rating,
        platforms
    }).then(() => {
        return Videogame.findAll() //Sólo para verificar que se están 
        //guardando en la bd

    })
        .then(resp => {
            res.json(resp)
        })

})


module.exports = router;