const { Videogame } = require("../db");
const crypto = require('crypto');

const createVideogame = async ({
  name,
  description,
  platforms,
  imagen,
  releaseDate,
  rating,
  genres,
}) => {
  const id = crypto.randomBytes(16).toString("hex");
   const newVideogame = await Videogame.create({
    id,
    name,
    description,
    imagen,
    releaseDate,
    rating,
  });
  await newVideogame.addGenres(genres);
  await newVideogame.addPlatforms(platforms);
   return newVideogame;
};
 

const postVideogames = async (req, res) => {
  try {
    const {
      name,
      description,
      platforms,
      imagen,
      releaseDate,
      rating,
      genres,
    } = req.body;
    const newVideogame = await createVideogame({
      name,
      description,
      platforms,
      imagen,
      releaseDate,
      rating,
      genres,
    });
    res.status(201).json(newVideogame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postVideogames;
