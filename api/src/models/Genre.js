const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('genre', {
        id: {
            // type: DataTypes.INTEGER,
            type: DataTypes.STRING,
            allowNull: false,
            // autoIncrement: true,
            primaryKey: true
          },  
          
        name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
         freezeTableName: true
    })
};