'use strict'

module.exports.ping = function ping(req, res, next) {
  res.send({
    message: 'This is the mockup controller for ping'
  });
};