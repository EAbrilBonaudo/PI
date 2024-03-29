const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      default: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
       
    }
    ,
   name:{
      type: DataTypes.STRING,
      allowNull: false,
   },
   description:{
      type:DataTypes.STRING,
      allowNull: false,
   },

   imagen:{
      type: DataTypes.STRING,
      allowNull: false,
   },
   
   releaseDate:{
      type: DataTypes.STRING,
      allowNull: false,
   },
   rating:{
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 5,
    },
    allowNull: false,
    
 },
}, { timestamps: false });
};

