'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.route('/login')
  .post((req, res) => {
    const password = req.body['password'];
    if (password !== process.env.PASSWORD) {
      res.status(401)
        .send();
      return;
    }
    const token = jwt.sign(password, process.env.SECRET);
    res.cookie('authToken', token, {
      httpOnly: true,
      signed: true,
      // secure: true,
      secret: process.env.SECRET,
    })
    .send();
  });

module.exports = router;
