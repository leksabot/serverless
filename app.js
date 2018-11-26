'use strict'

require('dotenv').config();
const serverless = require('serverless-http')
const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');


const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_USER2,{useNewUrlParser: true})

const IndexRoutes = require('./routes/index')
const QuestionRoutes = require('./routes/question')
const getTranslate = require('./routes/translate.js');
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', IndexRoutes)
app.use('/question', QuestionRoutes)
app.use('/translate', getTranslate);

app.get('/', (req,res) => {
    res.send('OK')
})

module.exports.run = serverless(app);