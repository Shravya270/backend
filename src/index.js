const express = require ('express');

const {ServerConfig} = require('./config');
const apiRoutes = require('./routes');
const serverConfig = require('./config/server-config');

const app = express();

app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT,()=>{
    console.log(`successfully started the server on PORT : ${serverConfig.PORT}`);
    //Logger.info("Successfully started the server","root",{});
});