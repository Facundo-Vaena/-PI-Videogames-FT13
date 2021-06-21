const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { conn } = require('../db');
const Sequelize = require('sequelize');
const { Genre } = require('../db.js')
const { v1: uuid, v1} = require('uuid');


router.get('/', (req, res) => {
    Genre.findAll()
        .then(resp => {
            if (resp.length > 0) {
                return resp
            } else{
                return fetch(`https://api.rawg.io/api/genres?key=f94de48cdec544d2b0b550d320afe33a`)
            }

        })

        .then(resp =>{
            if(Array.isArray(resp)){
                return resp
            }
            return resp.json()
        })
        .then(resp => {
            if(Array.isArray(resp)){
                return resp
            }
            resp.results.forEach(e => {
                Genre.create({
                    id: v1(),
                    name: e.name
                })
            })
           
        })
        // .then((resp) => {
        //     if(Array.isArray(resp)){
        //         return resp
        //     }
        //     return Genre.update()
        // })
        .then(resp =>{
            if(Array.isArray(resp)){
                return resp
            }
            return Genre.findAll()
        })
        .then(resp => res.json(resp))
        .catch(err => console.log(err));
        

})



//INTENTO QUE FUNCIONA BIEN, FALTA EL STATEMENT
// router.get('/', (req, res) => {

    // router.get('/', (req, res) => {
    //     Genre.findAll()
    //         .then(resp => {
    //             if (resp.length) {
    //                 return resp
    //             }
    //             return fetch(`https://api.rawg.io/api/genres?key=f94de48cdec544d2b0b550d320afe33a`)
    
    //         })
    
    //         .then(resp =>{
    //             if(Array.isArray(resp)){
    //                 return resp
    //             }
    //             return resp.json()
    //         })
    //         .then(resp => {
    //             if(Array.isArray(resp)){
    //                 return resp
    //             }
    //             resp.results.forEach(e => {
    //                 Genre.create({
    //                     name: e.name
    //                 })
    //             })
    //         })
    //         .then((resp) => {
    //             if(Array.isArray(resp)){
    //                 return resp
    //             }
    //             return Genre.findAll()
    //         })
    //         .then(resp => res.json(resp))
    //         .catch(err => console.log(err));
            
    
    
    
    // })






module.exports = router;