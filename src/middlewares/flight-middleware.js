const {StatusCodes} = require('http-status-codes');
const {ErrorResponse,SuccessResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(["Flight Number not found",StatusCodes.BAD_REQUEST])
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    if(!req.body.airplaneId){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(["Airplane Id not found",StatusCodes.BAD_REQUEST])
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    if(!req.body.departureAirportId){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(["Departure Airport Id not found",StatusCodes.BAD_REQUEST])
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    if(!req.body.arrivalAirportId){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(["Arrival Airport Id not found",StatusCodes.BAD_REQUEST])
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    if(!req.body.arrivalTime){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(["Arrival Time not found",StatusCodes.BAD_REQUEST])
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    if(!req.body.departureTime){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(["Departure Time not found",StatusCodes.BAD_REQUEST])
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    if(!req.body.price){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(["Price not found",StatusCodes.BAD_REQUEST])
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    if(!req.body.boardingGate){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(["Boarding Gate not found",StatusCodes.BAD_REQUEST])
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }

    if(!req.body.totalSeats){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(["Total Seats not found",StatusCodes.BAD_REQUEST])
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();

}

function validateUpdateSeatsRequest(req,res,next){
    if(!req.body.seats){
        ErrorResponse.message = 'Something went wrong while updating flight';
        ErrorResponse.error = new AppError(["Seats not found",StatusCodes.BAD_REQUEST])
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

module.exports={
    validateCreateRequest,
    validateUpdateSeatsRequest
}