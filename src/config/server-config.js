const dotenv = require('dotenv');
dotenv.config(); //to get environment variable in place

module.exports = {
    PORT: process.env.PORT
}