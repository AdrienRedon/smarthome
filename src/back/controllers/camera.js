'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const raspicam = require('raspicam');
const isAuthenticated = require('../middlewares/auth');

const filename = path.join(process.env.PICTURESPATH, 'image.jpg');

const camera = new raspicam({
  mode: 'timelapse',
  output: filename,
  timeout: 0,
  timelapse: process.env.TIMELAPSE,
});

camera.on('read', (err, timestamp, filename) => {
  if (err) console.error(err);
  console.log(`a photo has been saved at ${timestamp}`);
});

const router = express.Router();

router.get('/camera', isAuthenticated, (req, res) => {
  const img = fs.readFile(filename, (err, data) => {
    res.writeHead(200, {
      'Content-Type': 'image/jpg',
    });
    res.end(data, 'binary');
  });
});

router.post('/camera', isAuthenticated, (req, res) => {
  camera.start();
  res.end('timelapse has started');
});

router.delete('/camera', isAuthenticated, (req, res) => {
  camera.stop();
  res.end('timelapse has ended');
});

module.exports = router;
