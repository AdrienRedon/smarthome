'use strict';

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.signedCookies['authToken'];
  const decoded = jwt.verify(token, process.env.SECRET, (err, payload) => {
    if (err) {
      console.log('invalid token');
      res.status(401)
        .send();
      return;
    }
    console.log('valid token');
    next();
  });
};