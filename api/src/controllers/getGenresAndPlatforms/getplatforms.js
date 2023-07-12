const axios = require('axios');
require('dotenv').config();
const {APIKEY}= process.env
const {Platforms } = require('../../db');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getPf = async (req, res) => {
  try {
    const pfCount = await Platforms.count();
    if (pfCount !== 0) {
      const pfdb = await Platforms.findAll();
      return res.status(200).json(pfdb);
    } else {
      const { data } = await axios.get('https://api.rawg.io/api/platforms', {
        params: {
          key: APIKEY
        }
      });

      const pfs = data.results.map(pf => ({
        id: pf.id,
        name: pf.name
      }));

      // Guardar las plataformas en la base de datos
      await Platforms.bulkCreate(pfs, { ignoreDuplicates: true });

      return res.status(200).json(pfs);
    }
  } catch (error) {
    console.error(error); // Imprimir el error en la consola para depuración
    return res.status(500).json({ error: 'Ocurrió un error al obtener las plataformas.' });
  }
};

 
module.exports = {
  getPf,
};

