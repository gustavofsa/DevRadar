const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
       const { latitude, longitude, techs } = request.query;

       const techsArray = parseStringAsArray(techs);
       
       const devs = await Dev.find({
        techs: {
          $in: techsArray,
          },
          location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                },
                $maxDistance: 10000,
            },
          },
       });
      //busca dos devs (latitude e lonngitudo + techs)
      //buscar num raio de 10km
      // filtrar as tecnologias
        return response.json({ devs });
    }
}