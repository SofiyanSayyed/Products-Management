const userModel = require('../models/userModel');
const express = require('express');
const router = express.Router()
const {createUser} = require('../controller/userController')


router.post('/register', createUser)

router.all('/*', function(req, res){
    return res.status(400).json({status: false, message: "Invalid Request"});
})


module.exports = router