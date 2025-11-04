const crudRepository = require('./crud-repository');
const {Flight,Airplane,Airport,City} = require('../models');
const {Sequelize} = require('sequelize');
const db = require('../models')
const {addRowLockOnFlights} = require('./queries')

class FlightRepository extends crudRepository{
    constructor(){
        super(Flight);
    }


async getAllFlights(filter,sort){
    const response = await Flight.findAll({ //findAll is a inbuilt method
        where:filter,
        order:sort, //this will sort when query.sort is checked in flightService
        include:[
        {
            model : Airplane, //this will get all the flights and also fetch their airplanes details in one go
            required:true, //by default it will implement outer join by using required true it will be inner join
            as:'airplane_detail',

        },
        {
            model:Airport,
            required:true,
            as:'departure_airport',
            on:{
                col1: Sequelize.where(Sequelize.col("Flight.departureAirportId") ,"=", Sequelize.col("departure_airport.code"))
            },
            include:{
                model:City,
                required:true,
            }
        },
        {
            model:Airport,
            required:true,
            as:'arrival_airport',
            on:{
                col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId") ,"=", Sequelize.col("arrival_airport.code"))
            },
            include:{
                model:City,
                required:true,
            }
        }
        ]

    });
    return response;
    }

    async updateRemainingSeats(flightId,seats,dec=true){ //increment and decrement are inbuilt methods
        await db.sequelize.query(addRowLockOnFlights(flightId))
        const flight = await Flight.findByPk(flightId);
        if(+dec){ //false -> 0 shorthand for converting boolean to number
            await flight.decrement('totalSeats', {by:seats});
        }
        else{
            await flight.increment('totalSeats', {by:seats});
        }
        return flight;

        //since the below code was not saving the updated total seats in the json file and only updating in the table we improve the below code to save the changes in the flight
        // const flight = await Flight.findByPk(flightId);
        // if(dec){
        //     const response = await flight.decrement('totalSeats', {by:seats});
        //     return response;
        // }
        // else{
        //     const response = await flight.increment('totalSeats', {by:seats});
        //     return response;
        // }
        //the above improved code also doesn't work lol
    }
}
module.exports = FlightRepository;