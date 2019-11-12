const express = require('express');
const mongoose = require('mongoose');
const app = express();
const setRoutes = require('./routes');

mongoose.connect('mongodb://localhost/clase07', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        console.log('Base de datos lista para recibir conexiones');

        setRoutes(app);

        app.listen(8080, () => {
            console.log('Servidor listo para recibir conexiones');
        });
    })
    .catch((error) => {
        console.error(error);

        mongoose.connection.close();
    });
