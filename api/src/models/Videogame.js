const { DataTypes } = require('sequelize');


// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      // type: DataTypes.INTEGER,
      type: DataTypes.STRING,
      allowNull: false,
      // autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    released: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    }
  },{
    freezeTableName: true
  });
  
};
