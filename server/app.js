var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var boom = require('boom')
var cors = require('cors')
var fb = require('fb')
const sgMail = require('@sendgrid/mail');

var kue = require('kue')
  , queue = kue.createQueue({
    prefix: 'ququ',
    redis:{
      port:6379,
      host:'127.0.0.1'
    }
  });

var mongoose = require('mongoose')

require('dotenv').config()

mongoose.connection.openUri('mongodb://localhost/blogging');
mongoose.Promise = global.Promise;
mongoose.connection.once('open', () => {
  console.log('mongoose connection success');
}).on('error', (error) => {
  console.log('connection error', error);
})

var index = require('./routes/index');
var api = require('./routes/api');
var auth = require('./routes/auth');
var blog = require('./routes/blog');


var app = express();
app.use(cors())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', api);
app.use('/api/auth', auth);
app.use('/api/blog', blog);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(err)
});
kue.app.listen(6387)

queue.process('email',function(job,done){
  sgMail.setApiKey(process.env.sendgrid);
  const msg = {
    to: job.data.email,
    from: 'arief.manda56@gmail.com',
    subject: job.data.subject,
    text: job.data.text,
    html: job.data.html,
  };
  console.log(msg);
  sgMail.send(msg);
  done()
})

module.exports = app;
