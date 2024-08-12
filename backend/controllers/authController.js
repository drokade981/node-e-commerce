const User = require('../models/User');

const Jwt = require('jsonwebtoken');
const JwtKey = 'node-e-comm';

exports.login = async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            Jwt.sign({user}, JwtKey, {expiresIn: "2h"}, (error, token) => {
                if (error) {
                    resp.status(200).json({status : false, message: 'User not found'});
                }
                resp.status(200).json({status : true, message: 'User logged in successfully', data: {token, user} });
            });
        } else {
            resp.send({"status" : false, "message": "no user found"});
        }
    } else {
        resp.send({"status" : false, "message": "no user found"});
    }
}

exports.register = async (req, resp) => {
    try{
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        Jwt.sign({result}, JwtKey, {expiresIn: "2h"}, (error, token) => {
            if (error) {
                resp.status(200).json({status : false, message: 'User not found'});
            }
            resp.status(200).json({status : true, message: 'User registered successfully', data: {token, result} });
        });
    } catch (error) {
        // Handle validation errors and other errors
        if (error.name === 'ValidationError') {
            // Extract and format the validation errors
            const errors = Object.values(error.errors).map(err => ({
                field: err.path,
                message: err.message
            }));

            return resp.status(400).json({ errors });
        }

        // Handle duplicate key error (e.g., email already exists)
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0]; // Get the field that caused the error
            const value = error.keyValue[field]; // Get the duplicate value

            return resp.status(400).json({
                errors: [{
                    field: field,
                    message: `The ${field} '${value}' is already in use. Please choose a different ${field}.`
                }]
            });
        }
        
        resp.status(500).json({ message: 'Server error', error });
    }
}