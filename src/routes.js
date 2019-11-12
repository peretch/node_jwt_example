const mongoose      = require('mongoose');
const jsonwebtoken  = require('jsonwebtoken');

const { json } = require('body-parser');

module.exports = (app) => {
    app.post('/signup', json(), (req, res) => {
        
    });
};
