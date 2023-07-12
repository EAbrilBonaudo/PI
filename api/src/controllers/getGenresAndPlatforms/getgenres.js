const axios = require('axios');
require('dotenv').config();
const {APIKEY}= process.env
const {Genres } = require('../../db');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getGenres = async (req, res) => {
  try {
    const genresCount = await Genres.count();     
    if (genresCount !== 0) {
      const genresdb = await Genres.findAll();
      return res.status(200).json(genresdb);
    } else {
      const { data } = await axios.get('https://api.rawg.io/api/genres', {
        params: {
          key: APIKEY
        }
      });

      const genres = data.results.map(genre => ({
        id: genre.id,
        name: genre.name
      }));

      // Guardar los géneros en la base de datos
      await Genres.bulkCreate(genres, { ignoreDuplicates: true });

      return res.status(200).json(genres);
    }
  } catch (error) {
    console.error(error); // Imprimir el error en la consola para depuración
    return res.status(500).json({ error: 'Ocurrió un error al obtener los géneros.' });
  }
};

module.exports = {
    getGenres,
};
