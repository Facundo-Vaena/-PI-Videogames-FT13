require('dotenv').config();
const { Sequelize, condition } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST, API_KEY
} = process.env;




const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

sequelize.authenticate().then(()=> console.log('success')).catch(err => console.log(err))
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genre } = sequelize.models;


   //----------------------------------
// const force = true;
// db.sync({ force })
//     .then(function () {
//         app.listen(3001, function () {
//             console.log('Server is listening on port 3001!');

//          
         
//         });
        
//     });
    //----------------------------------

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
// Page.belongsToMany(Category, {through: 'Page_Category'});
// Category.belongsToMany(Page, {through: 'Page_Category'});
Videogame.belongsToMany(Genre, {through: 'videogame_genre'});
Genre.belongsToMany(Videogame, {through: 'videogame_genre'});


// sequelize.sync({ force: true }).then(()=>{
//    Videogame.create({
//     name: 'CoD3',
//     description: 'war game with shoots',
//     released: 6-7-89,
//     rating: 4.6,
//     platforms: "PS3"
//   });
//   Genre.create({
//     name: 'adventure'
//   })
// }).catch(err => console.log(err))

// Genre.sync({ force: true }).then(() =>{
//   return Genre.create({
//     name: 'adventure'
//   })
// }).catch(err => console.log(err))

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  
};
