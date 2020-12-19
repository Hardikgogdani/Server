const express = require( "express" );
const bodyParser = require( "body-parser" );
const cors = require("cors");
const mongoose = require('mongoose');
const config = require("./src/config/database.config")
mongoose.Promise = global.Promise;
// const customResponses = require( "./src/middlewares/customResponses" );
const logger = require( "./src/utilities/logger" );
const app = express( );
app.use( bodyParser.json( ) );
// app.use( customResponses );
app.use(cors());
// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
require( "./src/app" )( app );
app.use( ( req, res ) => {
    res.notFound( );
} );
app.use( ( err, req, res, next ) => {
    logger.error( err.stack );
    next( err );
} );
// Don't remove next !!!!
app.use( ( err, req, res, next ) => { // eslint-disable-line no-unused-vars
    res.status( 503 ).json( {
        success: false,
        error: "server_error",
    } );
} );
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin',  req.headers.origin);
    res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');
    next();
});
app.listen( 8080, ( ) => {
    logger.info( `Listening on port 8080` );
} );