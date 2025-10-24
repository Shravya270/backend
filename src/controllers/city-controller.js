const { StatusCodes } = require('http-status-codes');
const {CityService} = require('../services');
const { SuccessResponse,ErrorResponse } = require('../utils/common');

async function createCity(req,res){
    try{
    const city = await CityService.createCity({
        name:req.body.name
    });
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
            ErrorResponse.error=error;
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

module.exports={
    createCity
}