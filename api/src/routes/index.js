const { Router } = require('express');
const { getVideoGames } = require('../controllers/getVideogamesControllers/getvideogames');
const { SearchGames } = require('../controllers/getVideogamesControllers/get15videogames');
const { getVideogameById } = require('../controllers/getVideogamesControllers/getvideogamesById'); 
const { login }=require( "../controllers/Login")
const { getGenres }=require( "../controllers/getGenresAndPlatforms/getgenres")
const { PostUser }=require( "../controllers/postUser")
const { getPf }=require( "../controllers/getGenresAndPlatforms/getplatforms")
const postVideogames = require('../controllers/postvideogames');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.get("/videogames",getVideoGames);
router.get("/login",login);
router.post("/login" , (req,res)=>{PostUser (req,res);})
router.get("/genres",getGenres);
router.get("/platforms",getPf);
router.get('/videogames/name', SearchGames);
router.get("/videogames/:idVideogame",getVideogameById);
router.post('/videogames', postVideogames);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
