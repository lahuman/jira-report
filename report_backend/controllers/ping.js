'use strict'

var varping = require('./pingService');

module.exports.ping = function ping(req, res, next) {
  varping.ping(req.swagger.params, res, next);
};