const {createLogger,format,transports} = require('winston'); //createLogger is a function and format and transports are objects
const {combine,timestamp,printf} = format;  //format object is destructured here

const customFormat = printf(({level,message,label,timestamp})=>{
    return `${timestamp}: ${level}: ${message}`; //standard template for winston
});

const logger = createLogger({
    format:combine(
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        customFormat
    ),
    transports:[
        new transports.Console(),
        new transports.File({filename:'combined.log'})
    ],
})

module.exports = logger;