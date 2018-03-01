const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
  var decoded = jwt.verify(req.headers.token,process.env.SECRET_TOKEN)
  if(decoded){
    req.decoded=decoded.user
    next()
  }else{
    next('Token undifined')
  }
}