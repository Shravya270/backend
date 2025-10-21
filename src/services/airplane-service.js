const {AirplaneRepository} = require('../repositories');
const airplaneRepository = new AirplaneRepository();

async function createAirPlane(data){
    try{
        const airplane = await airplaneRepository.create(data);
        return airplane;
    }
    catch(error){
        throw error;
    }
}

module.exports = {
    createAirPlane
}