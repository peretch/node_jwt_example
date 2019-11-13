const mongoose  = require('mongoose');

const User = require('./models/user.model');

const { json } = require('body-parser');
const { sign } = require('jsonwebtoken');
const { compare, hash } = require('bcrypt');
const checkJwt = require('express-jwt');

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
                if(error.code === 11000){
                    res
                    .status(401)
                    .json({
                        message: ('El usuario on el mail "' + error.keyValue.email + '" ya existe en el sistema')
                    })
                }
                
                res.json({
                    error
                })
            });
    });

    app.post('/login', json(), (req, res) => {
        const userBody = req.body;

        User.findOne({ email: userBody.email })
            .then((userDoc) => {
                return Promise.all([
                    userDoc,
                    compare(
                        userBody.password, 
                        userDoc.password
                    )
                ]);
            })
            .then((user) =>  {
                const token = sign({}, JWT_SECRET);

                res.json({
                    user: user,
                    token
                })
            })
            .catch((error) => {
                res
                    .status(400)
                    .json({
                        error: error.message
                    });
            })
    });

    app.get('/private', checkJwt({ secret: JWT_SECRET }), (req, res) => {
        res.json({
            message: "Todo legal"
        })
    });
};
