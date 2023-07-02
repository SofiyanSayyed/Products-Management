const express = require('express')
const mongoose = require('mongoose')
const app = express()
const route = require('./routes/route.js')
require('dotenv').config()
const {MONGO_STRING, PORT} = process.env

app.use(express.json())

app.use("/", route)

mongoose.connect(MONGO_STRING, {useNewUrlParser : true})
.then (() => console.log('MongoDB Connected'))
.catch(err => console.log(err.message || err));

app.listen(PORT || 3000, () => {
    console.log("Server listening on port " + PORT)
});