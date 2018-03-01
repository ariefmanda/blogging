const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
  var decoded = jwt.verify(req.headers.token,'loveyou')
  if(decoded){
    req.decoded=decoded.user
    next()
  }else{
    next('Token undifined')
  }
}