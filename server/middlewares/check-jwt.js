const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function(req, res, next) {
    // req is request the headers of the http. check the header contains 
    //any tokens or not
  let token = req.headers['authorization'];

  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        res.json({
          success: false,
          message: 'Failed to authenticate token'
        });
      } else {

        req.decoded = decoded;
        next();

        //req.decoded.user.name to decript the token

      }
    });

  } else {

    res.status(403).json({
      success: false,
      message: 'No token provided'
    });

  }
};
