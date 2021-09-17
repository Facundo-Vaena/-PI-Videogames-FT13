const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { conn } = require('../db');
const Sequelize = require('sequelize');
const { Genre } = require('../db.js')
const { v1: uuid, v1} = require('uuid');
require('dotenv').config();
const { API_KEY } = process.env
// const {API_KEY} = require('./const')
// const { apiKey } = require('../db.js')
router.get('/', (req, res) => {
    Genre.findAll()
        .then(resp => {
            if (resp.length > 0) {
                return resp
            } else{
                return fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
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
        .then(resp =>{
            if(Array.isArray(resp)){
                return resp
            }
            return Genre.findAll()
        })
        .then(resp => res.json(resp))
        .catch(err => console.log(err));
        

})


module.exports = router;