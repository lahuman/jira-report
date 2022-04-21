'use strict'

module.exports.login = (req, res, next) => {
  const {id, pw} = req.swagger.params.body.value;
  if(id === process.env.ID && pw === process.env.PW){
    req.session.userId = id;
    res.send({id});
  }else {
      res.status(403).send({message: '로그인 실패하였습니다.'});
  }
};

module.exports.loginCheck = (req, res, next) => {
  if(req.session.userId === process.env.ID){
    res.send({id: process.env.ID});
  }else {
    res.status(403).send({message: '로그인이 필요합니다.'});
  }
};