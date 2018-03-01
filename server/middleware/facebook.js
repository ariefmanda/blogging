var FB = require('fb')
function find(req,res,next) {
  FB.setAccessToken(req.headers.fbtoken);
  FB.api('/me', {
    fields: ['name', 'email', 'picture', 'age_range']
  }, 'GET',function(response) {
    if (!response || response.error) { 
      next(response.error)
    }else{
      req.fb=response
      next()
    }
  });
}
module.exports = find
