const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { conn } = require('../db');
const Sequelize = require('sequelize');
const { Videogame, Genre } = require('../db.js')
const { v1: uuid, v1 } = require('uuid');

//  const API_KEY  = process.env.API_KEY;

router.use(express.json());

// apiKey ----> f94de48cdec544d2b0b550d320afe33a

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
                gameDetails.genres = resp.genres.map(e => { return e.name })
                return gameDetails
            }
            else {
                return fetch(`https://api.rawg.io/api/games/${req.params.idVideoGame}?key=f94de48cdec544d2b0b550d320afe33a`)

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
    // try {
    //     const response = await fetch(`http://jsonplaceholder.typicode.com/users/4`)
    //     res.json(response)
    //   } catch(error){
    //       console.log("no");
    //   }



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
        return fetch(`https://api.rawg.io/api/games?key=f94de48cdec544d2b0b550d320afe33a`)
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
        return fetch(`https://api.rawg.io/api/games?key=f94de48cdec544d2b0b550d320afe33a&search=${search}`)
            .then(resp => resp.json())
            .then(resp => {
                if (resp.results.length) {
                    var games = [];
                    for (var i = 0; i < resp.results.length; i++) {
                        if (games.length > 14) break;
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




























//idVideogame que funciona bien sin ir a la bd
// router.get('/:idVideoGame', (req, res) => {
// fetch(`https://api.rawg.io/api/games/${req.params.idVideoGame}?key=f94de48cdec544d2b0b550d320afe33a`)
//         .then(resp => resp.json())
//         .then(resp => {
//             var gameDetails = {};
//             gameDetails.img = resp.background_image
//             gameDetails.name = resp.name
//             gameDetails.genres = resp.genres.map(e => { return e.name })
//             gameDetails.description = resp.description
//             gameDetails.released = resp.released
//             gameDetails.rating = resp.rating
//             gameDetails.platforms = resp.parent_platforms.map(e => { return e.platform.name })
//             return gameDetails
//         })
//         .then(resp => {
//             !resp.name ? res.send('Videogame not found') :
//                 res.json(resp)
//         })
//         .catch(err => console.log(err));

//     })

















//post que funciona bien (sin relacionar genres)

// router.post('/', (req, res) => {
//     const { name, description, released, rating, platforms, genres } = req.body;
//     if (name) {
//         Videogame.create({
//             id: v1(),
//             name,
//             description,
//             released,
//             rating,
//             platforms
//         })
//             // .then(() => {
//             //     // return  Videogame.findAll() //Sólo para verificar que se están 
//             //     //guardando en la bd

//             // })
//             // .then(() =>{
//             //     genres.length ? genres.map(e =>{
//             //         return Genre.create({
//             //             id: v1(),
//             //             name: e
//             //         })
//             //     })
//             // : res.send('aca') })
//             .then(() =>{
//                 if(genres.length){
//                     Genre.create({
//                         id: v1(),
//                         name: genres
//                     })
//                 }
//                 return
//             })
//             .then(() => {
//                 return res.json(true)
//             })
//             .catch(err => console.log(err))
//     }
// })












//GET a /videogames sin search que funciona (sin traer los juegos creados)

//if (!search) {
// return fetch(`https://api.rawg.io/api/games?key=f94de48cdec544d2b0b550d320afe33a`)
//     .then(resp => resp.json())
//     .then(resp => {

//         var games = [];    

//         for (var i = 0; i < resp.results.length; i++) {
//             if (games.length > 14) break;
//             var game = {};
//             game.id = resp.results[i].id
//             game.name = resp.results[i].name
//             game.img = resp.results[i].background_image;
//             // game.genres = resp.results[i].genres;
//             games.push(game)
//         }
//         return games
//         //while (games.length !== 15) {

//         // let game = {};
//         //resp.results.map(e => {
//         // game.id = e.id
//         // game.name = e.name;
//         // game.img = e.background_image;
//         // game.genres = e.genres;
//         // return game

//         //})
//         // games.push(game)
//         //}

//     })

//     .then(resp => {
//         return res.json(resp)
//     })

//     .catch(err => console.log(err))


//}





















// router.post('/', (req, res) => { //Comenté la plataforma porque el enunciado no la menciona 
//     const { name, description, released, rating, platforms } = req.body;
//     Videogame.create({
//         id: v1(),
//         name,
//         description,
//         released,
//         rating,
//         platforms
//     }).then(() => {
//         return Videogame.findAll() //Sólo para verificar que se están 
//         //guardando en la bd

//     })
//         .then(resp => {
//             res.json(resp)
//         })

// })


//----------------------Prueba post

// router.get('/', (req, res) => {
//     //listado 1eros 15 juegos
//     const { search } = req.query;
//     if (!search) {
//         return fetch(`https://api.rawg.io/api/games?key=f94de48cdec544d2b0b550d320afe33a`)
//             .then(resp => resp.json())
//             .then(resp => {

//                 var games = [];
//                 while (games.length !== 15) {
//                     let game = {};

//                     resp.results.forEach(e => {
//                         game.name = e.name;
//                         game.img = e.background_image;
//                         game.genres = e.genres;


//                     })
//                     games.push(game)
//                 }
//                 return games

//             })

//             .then(resp => {
//                 res.json(resp)
//             })

//             .catch(err => console.log(err))
//     }
//     return fetch(`https://api.rawg.io/api/games?key=f94de48cdec544d2b0b550d320afe33a&search=${search}`)
//         .then(resp => resp.json())
//         .then(resp => {
//             var games = [];
//             for(var i = 0; i < resp.results.length; i++){
//                 if(games.length > 14) break;
//                 var game = {}
//                 game.name = resp.results[i].name
//                 game.img = resp.results[i].background_image
//                 // game.genres = resp.results[i].genres
//                 games.push(game)
//             }
//             return games

//         })
//         .then(resp => {
//             // !resp[0].name ?  res.send('Videogame not found') :
//              res.json(resp)
//         })
//         .catch(err => console.log(err))

// })





// while (games.length < 10) {
//     if(games.length === 14) break
//     resp.results.forEach(e => {
//         let game = {};
//         game.name = e.name;
//         game.img = e.background_image;
//         game.genres = e.genres;

//         games.push(game)
//     })
// }
// return games

// while (games.length !== 3) {
//     results.forEach(e => {
//     let game = {};
//         game.name = e.name;
//         game.img = e.background_image;
//         game.genres = e.genres;

//     games.push(game)
//     })
// }


module.exports = router;