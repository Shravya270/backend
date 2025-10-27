const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const { compareTime } = require('../utils/helpers/datetime-helpers');
const {Op} = require('sequelize');
const AppError = require('../utils/errors/app-error');

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        // Ensure valid ISO format for Date
        const departureTime = new Date(data.departureTime.replace(' ', 'T'));
        const arrivalTime = new Date(data.arrivalTime.replace(' ', 'T'));

        // Check if arrival > departure
        if (!compareTime(arrivalTime, departureTime)) {
            throw new AppError(
                'Arrival time must be later than departure time',
                StatusCodes.BAD_REQUEST
            );
        }

        // Create the flight
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            let explanation = error.errors.map(err => err.message);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        // Only rethrow if it's not our custom AppError
        if (error instanceof AppError) throw error;

        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    //Initialize an empty filter object to store search criteria
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = " 23:59:00";
    //Check if the 'trips' filter is provided in the query (e.g., "MUM-DEL")
    if (query.trips) {
        // Split the trips string into departure and arrival airport codes
        const [departureAirportId, arrivalAirportId] = query.trips.split("-");

        // Add these airport IDs to the custom filter object
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }

    if(query.price){
        const [minPrice,maxPrice] = query.price.split("-");
        customFilter.price={
            [Op.between] : [minPrice,((maxPrice===undefined)? 20000:maxPrice)]
        }
    }

    if(query.travellers){
        customFilter.totalSeats={
            [Op.gte] : [query.travellers]
        }
    }

    if(query.tripDate){
        customFilter.departureTime={
            [Op.between]:[query.tripDate,query.tripDate+ endingTripTime]
        }
    }

    if(query.sort){
        const params = query.sort.split(',');
        const sortFilters = params.map((param)=> param.split('_'));
        sortFilter=sortFilters;
    }

    try{
        // If no filters are provided, it fetches all flights
        const flights = await flightRepository.getAllFlights(customFilter,sortFilter);
        return flights;
    }
    catch(error){
        throw new AppError('Cannot fetch data of all flights',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
};
