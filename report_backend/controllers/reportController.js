'use strict'

var service = require('./reportService');

module.exports.getReport = function getReport(req, res, next) {
  if(req.session.userId !== process.env.ID){
    res.status(403).send({message: '로그인이 필요합니다.'});
    return;
  }
  service.getReport(req.swagger.params, res, next);
};
