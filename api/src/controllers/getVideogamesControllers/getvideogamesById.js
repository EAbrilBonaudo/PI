const axios = require('axios');
require('dotenv').config();
const {APIKEY}= process.env
const {Genres, Platforms, Videogame} = require('../../db');

const getVideogameById = async (req, res) => {
  try {
    const { idVideogame } = req.params;
    let videogame;
    const regex = /(\w+\-){4}\w+/g;

     if (regex.test(idVideogame)) {
      // Buscar el juego con la ID específica en la base de datos local
      const dbVideoGame = await Videogame.findOne({
        where: { id: idVideogame },
        include: [Genres, Platforms],
      });
       if (dbVideoGame) {
        // Si se encuentra el juego en la base de datos local, formatear los datos y devolver el resultado
        videogame = {
          id: dbVideoGame.id,
          name: dbVideoGame.name,
          description: dbVideoGame.description,
          released: dbVideoGame.released,
          rating: dbVideoGame.rating,
          imagen: dbVideoGame.background_image,
          platforms: dbVideoGame.platforms.map(platform => platform.name),
          genres: dbVideoGame.genres.map(genre => genre.name)
        };
      }
    } else {
      const { data } = await axios.get(`https://api.rawg.io/api/games/${idVideogame}`, {
        params: {
          key: APIKEY
        }
      });
       // Si se encuentra el juego en la API RAWG Games, formatear los datos y devolver el resultado
      videogame = {
        id: data.id,
        name: data.name,
        description: data.description,
        released: data.released,
        rating: data.rating,
        imagen: data.background_image,
        platforms: data.platforms.map(platform => platform.platform.name),
        genres: data.genres.map(genre => genre.name)
      };
    }
     if (videogame) {
      return res.status(200).json(videogame);
    } else {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  getVideogameById,
};
