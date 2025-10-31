const {StatusCodes} = require('http-status-codes');
const {AirportRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error')


const airportRepository = new AirportRepository();

async function createAirPort(data){
    try{
        const airport = await airportRepository.create(data);
        return airport;
    }
    catch(error){
        if(error.name =='SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airport object',StatusCodes.INTERNAL_SERVER_ERROR);
}
}

async function getAirports(){
    try{
        const airport = await airportRepository.getAll();
        return airport;
    }
    catch(error){
        throw new AppError('Cannot fetch data of all airports',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
   
}

async function destroyAirport(id){
    try{
        const airport = await airportRepository.destroy(id);
        return airport;
    }
    catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested to delete is not found',error.statusCode);
        }
        throw new AppError('Cannot fetch the data of the airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id,data){
    try{
        const airport = await airportRepository.update(id,data);
        return airport;
    }
    catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested to update is not found',error.statusCode);
        }
        throw new AppError('Cannot fetch the data of the airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirPort,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport,
}