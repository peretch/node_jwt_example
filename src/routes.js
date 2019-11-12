const mongoose  = require('mongoose');

const User = require('./models/user.model');

const { json } = require('body-parser');
const { sign } = require('jsonwebtoken');
const { compare, hash } = require('bcrypt');

const JWT_SECRET = "wololo";


module.exports = (app) => {
    app.post('/signup', json(), (req, res) => {
        const userBody = req.body;

        hash(userBody.password, 10)
            .then((hash) => {
                return User.create({
                    name:       userBody.name,
                    email:      userBody.email,
                    password:   hash
                })
            })
            .then((created_user) => {
                const token = sign({}, JWT_SECRET);

                res.json({
                    user: created_user,
                    token
                });
            })
            .catch((error) => {
                res.json({
                    error
                })
            });
    });
};
