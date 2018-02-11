'use strict';

require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authController = require('./controllers/auth');
const lightsController = require('./controllers/lights');
const cameraController = require('./controllers/camera');
const authenticationMiddleware = require('./middlewares/authentication');
const jwtOpts = require('./jwt');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.SECRET));

app.use(authController);
app.use(lightsController);
app.use(cameraController);

app.use('/web', express.static(path.join(__dirname, '..', 'front')));

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
