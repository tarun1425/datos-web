var express = require('express');
var router = express.Router();
const mongoose = require('../database/mongo/db');

// controllers
const registerCtrl = require('../controller/authentication/registration');
const loginCtrl = require('../controller/authentication/login');


// middlewares
const jwtHelper = require('../config/jwtHelper');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// registration
router.post('/register', registerCtrl.register);

//login
router.post('/authenticate', loginCtrl.authenticate);


module.exports = router;
