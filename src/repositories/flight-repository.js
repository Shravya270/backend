const crudRepository = require('./crud-repository');
const {Flight,Airplane,Airport,City} = require('../models');
const {Sequelize} = require('sequelize');

class FlightRepository extends crudRepository{
    constructor(){
        super(Flight);
    }


async getAllFlights(filter,sort){
    const response = await Flight.findAll({
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
}
module.exports = FlightRepository;