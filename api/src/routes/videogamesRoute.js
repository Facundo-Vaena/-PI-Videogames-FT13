const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
// const { conn } = require('../db');
const Sequelize = require('sequelize');
const { Videogame, Genre } = require('../db.js')
const { v1: uuid, v1 } = require('uuid');
const { API_KEY } = process.env

router.use(express.json());


router.get('/:idVideoGame', (req, res) => {
    //detalle del videojuego ingresado (id)
    Videogame.findOne({
        where: { id: req.params.idVideoGame },
        include: Genre
    })
        .then(resp => {
            if (resp) {
                var gameDetails = {}
                gameDetails.flag = true
                gameDetails.img = 'https://designbro.com/blog/wp-content/uploads/image2-1.png'
                gameDetails.name = resp.name
                resp.genres ? gameDetails.genres = resp.genres.map(e => { return e.name }) : null
                gameDetails.description = resp.description
                gameDetails.released = resp.released
                gameDetails.rating = resp.rating
                gameDetails.platforms = resp.platforms.map(e => { return e })
                // gameDetails.genres = resp.genres.map(e => { return e.name })
                return gameDetails
            }
            else {
                return fetch(`https://api.rawg.io/api/games/${req.params.idVideoGame}?key=${API_KEY}`)

            }
        })
        .then(resp => { if (!resp.flag) { return resp.json() } return resp })
        .then(resp => {
            if (!resp.flag) {
                var gameDetails = {};
                gameDetails.img = resp.background_image
                gameDetails.name = resp.name
                gameDetails.genres = resp.genres.map(e => { return e.name })
                gameDetails.description = resp.description
                gameDetails.released = resp.released
                gameDetails.rating = resp.rating
                gameDetails.platforms = resp.parent_platforms.map(e => { return e.platform.name })
                return gameDetails
            }
            return resp
        })
        .then(resp => {
            !resp.name ? res.send('Videogame not found') :
                res.json(resp)
        })
        .catch(err => console.log(err));
    



})

router.post('/', (req, res) => {
    const { name, description, released, rating, platforms, genres } = req.body;

    if (name && genres) {
        let newGenres = genres.map(e => {
            let genre = {};
            genre.id = v1();
            genre.name = e
            return genre

        })
        Videogame.create({
            id: v1(),
            name,
            description,
            released,
            rating,
            platforms,
            genres: newGenres

        }, {
            include: 'genres'
        })

    }

    else if (name && !genres) {
        Videogame.create({
            id: v1(),
            name,
            description,
            released,
            rating,
            platforms

        })

            .then(() => {
                return res.json(true)
            })
            .catch(err => console.log(err))
    }
})




router.get('/', (req, res) => {
    //listado 1eros 15 juegos
    const { search } = req.query;

    if (!search) {
        let games = [];
        return fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
            .then(resp => resp.json())
            .then(resp => {
                // console.log('HOLA',resp.results)
                let next = resp.next

                for (var i = 0; i < resp.results.length; i++) {
                    // if (games.length > 14) break;
                    var game = {};
                    game.id = resp.results[i].id
                    game.name = resp.results[i].name
                    game.img = resp.results[i].background_image;
                    game.rating = resp.results[i].rating
                    game.genres = resp.results[i].genres.map(e => { return e.name })
                    games.push(game)
                }
                return fetch(next)
            })


            
            .then(resp => resp.json())
            .then(resp => {

                let next = resp.next

                for (var i = 0; i < resp.results.length; i++) {
                    // if (games.length > 14) break;
                    var game = {};
                    game.id = resp.results[i].id
                    game.name = resp.results[i].name
                    game.img = resp.results[i].background_image;
                    game.rating = resp.results[i].rating
                    game.genres = resp.results[i].genres.map(e => { return e.name })
                    games.push(game)
                }
                return fetch(next)


            })
            .then(resp => resp.json())
            .then(resp => {

                let next = resp.next

                for (var i = 0; i < resp.results.length; i++) {
                    // if (games.length > 14) break;
                    var game = {};
                    game.id = resp.results[i].id
                    game.name = resp.results[i].name
                    game.img = resp.results[i].background_image;
                    game.rating = resp.results[i].rating
                    game.genres = resp.results[i].genres.map(e => { return e.name })
                    games.push(game)
                }
                return fetch(next)


            })
            .then(resp => resp.json())
            .then(resp => {

                let next = resp.next

                for (var i = 0; i < resp.results.length; i++) {
                    // if (games.length > 14) break;
                    var game = {};
                    game.id = resp.results[i].id
                    game.name = resp.results[i].name
                    game.img = resp.results[i].background_image;
                    game.rating = resp.results[i].rating
                    game.genres = resp.results[i].genres.map(e => { return e.name })
                    games.push(game)
                }
                return fetch(next)


            })

            .then(resp => resp.json())
            .then(resp => {

                for (var i = 0; i < resp.results.length; i++) {
                    // if (games.length > 14) break;
                    var game = {};
                    game.id = resp.results[i].id
                    game.name = resp.results[i].name
                    game.img = resp.results[i].background_image;
                    game.rating = resp.results[i].rating
                    game.genres = resp.results[i].genres.map(e => { return e.name })
                    games.push(game)
                }
                return Videogame.findAll({
                    include: Genre
                })


            })

            .then(resp => {
                if (resp.length) {
                    for (var i = 0; i < resp.length; i++) {
                        games.unshift({
                            id: resp[i].id,
                            created: true,
                            name: resp[i].name,
                            img: 'https://designbro.com/blog/wp-content/uploads/image2-1.png',
                            description: resp[i].description,
                            released: resp[i].released,
                            rating: resp[i].rating,
                            platforms: resp[i].platforms,
                            genres: resp[i].genres.map(e => { return e.name })
                        })

                    }
                    return games
                }

                return games
            })

            .then(resp => {
                return res.json(resp)
            })

            .catch(err => console.log(err))


        }
    if (search) {
        let games = [];
        Videogame.findOne({
            where: { name: search },
            include: Genre
        })
            .then(resp => {

                if (resp) {
                    var game = {}
                    game.id = resp.id
                    game.name = resp.name
                    game.img = 'https://designbro.com/blog/wp-content/uploads/image2-1.png'
                    resp.genres.length ? game.genres = resp.genres.map(e => { return e.name }) : null
                    games.push(game);
                    return fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${search}`);

                }
                return fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${search}`);
            })

            .then(resp => resp.json())
            .then(resp => {
                if (resp.results.length) {
                    
                    for (var i = 0; i < resp.results.length; i++) {
                        if (games.length > 13) break;
                        var game = {}
                        game.id = resp.results[i].id
                        game.name = resp.results[i].name
                        game.img = resp.results[i].background_image
                        resp.results[i].genres.length ? game.genres = resp.results[i].genres.map(e => { return e.name }) : null
                        games.push(game)
                    }
                    return games
                } else {
                    return 'Videogame Not Found'
                }

            })
            .then(resp => {
                res.json(resp)
            })
            .catch(err => console.log(err))
    }


    

    })

module.exports = router;