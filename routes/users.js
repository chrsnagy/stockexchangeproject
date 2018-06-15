var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jsonwebtoken');

var User = require("../model/user");
var Config = require('../model/database');
require('../config/passport')(passport);


/* Register User */
router.post('/register', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({ success: false, msg: 'Please provide username and password!' });
    } else {
        var user = new User({
            username: req.body.username,
            password: req.body.password
        });
        user.save(function (err) {
            if (err) {
                return res.json({ success: false, msg: 'Username already taken!' });
            }
            res.json({ success: true, msg: 'Registration successful!' });
        });
    }
});

/* Login User */
router.post('/login', function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).send({ success: false, msg: 'Wrong username or password! Please enter correct username and password.' });
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    //create token if password matches
                    var token = jwt.sign(user.toJSON(), Config.secret);
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.status(401).send({ success: false, msg: 'Wrong username or password! Please enter correct username and password.' });
                }
            });
        }
    });
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;
