const express = require ('express');

const {ServerConfig} = require('./config');
const apiRoutes = require('./routes');
const serverConfig = require('./config/server-config');
const { City } = require('./models');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT,()=>{
    console.log(`successfully started the server on PORT : ${serverConfig.PORT}`);
    //Logger.info("Successfully started the server","root",{});
    
    // [<.....const city = await City.findByPk(1);
    // await city.createAirport({name:'Kempegowda Airport',code:'BLR'})

    // await City.destroy({
    //     where:{
    //         id:4
    //     }
    // }) ....> this is the draft code to check the foreign key functionality using delete]
});