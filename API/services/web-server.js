const http = require('http');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const webServerConfig = require('../config/web-server');
const router_public = require('./router_public');
const router_private = require('./router_private');

const auth_service = require('./auth-service')

let httpServer;

function initialize(){
    return new Promise((resolve, reject) =>{
        const app = express();
        app.options('*', cors())
        app.use( (req, res, next) => { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next(); });
        httpServer = http.createServer(app);
        app.use(express.json({ extended: true }))
        app.use(express.urlencoded({ extended: true }));
        app.use(morgan('dev'));
        app.use('/public', router_public);
        app.use('/private', auth_service.isrevoked, router_private);
        httpServer.listen(webServerConfig.port, '0.0.0.0')
        .on('listening', () =>{
            console.log(`Servidor iniciado, escuchando en el puerto ${webServerConfig.port}`);
            resolve();
        })
        .on('error', error => {
            reject(error);
        });
    });
}

function close(){
    return new Promise((resolve, reject) => {
        httpServer.close(err =>{
            if(err)
                return reject(err);
            resolve();
        });
    });
}

module.exports.initialize = initialize;
module.exports.close = close;