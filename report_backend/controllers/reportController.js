'use strict'

var service = require('./reportService');

module.exports.getReport = function getReport(req, res, next) {
  service.getReport(req.swagger.params, res, next);
};
