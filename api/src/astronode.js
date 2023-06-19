const express = require('express');
const morgan = require('morgan');
const cors = require("cors");

const api = express();

// settings
api.set('port', process.env.PORT || 2000);
api.set('json spaces', 2);

// middlewares
api.use(morgan('dev'));
api.use(express.urlencoded({extended:false}));
api.use(express.json());
api.use(cors());

// rutas
api.use('/astroApi', require('./rutas/dataBase'));
api.use('/astroApi', require('./rutas/nasaApi'));
api.use('/astroApi', require('./rutas/openNotify'));
api.use('/astroApi', require('./rutas/ninjaApi'));
api.use('/astroApi', require('./rutas/eventsApi'));

// Starting server
api.listen(2000, () =>{
    console.log(`Server on port ${api.get('port')}`);
});