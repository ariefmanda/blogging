const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
  var decoded = jwt.verify(req.headers.token,process.env.secretjwt)
  if(decoded){
    req.decoded=decoded.user
    next()
  }else{
    next('Token undifined')
  }
}