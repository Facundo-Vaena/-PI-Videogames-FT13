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
            //type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true
        }
    }, {
         freezeTableName: true
    })
};