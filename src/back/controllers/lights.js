'use strict';

const express = require('express');
const isAuthenticated = require('../middlewares/auth');
const lights = require('../utils/lights');

const router = express.Router();

router.route('/lights')
  .get(isAuthenticated, (req, res) => {
    console.log('get lights');
    lights.getState()
      .then(state => {
        console.log(state);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(state));
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      })
  });

  router.route('/lights/:id')
    .put(isAuthenticated, (req, res) => {
      console.log(req.params.id);
      lights.turnOn(req.params.id)
        .then(() => {
          res.status(200).end();
        })
    });

module.exports = router;
