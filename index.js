'use strict'
//Setup

const formidableMiddleware = require('express-formidable');
const dotenv = require('dotenv');
var fs = require('fs');
var path = require('path');
var request = require('request');
var rp = require('request-promise');
var serveStatic = require('serve-static');
const aws = require('aws-sdk');



var express = require('express')
	, app = express();
const PORT = process.env.PORT || 3000;
var router = express.Router();
const basicAuth = require('express-basic-auth')

var filename = "";
var thing = '';

dotenv.config();

app.use(basicAuth({
    users: {
        '###': '###',
        '###': '###'
    },
    challenge: true
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

var options = {
  'method': 'POST',
  'uri': 'https://jjdxb1aex5.execute-api.us-west-2.amazonaws.com/dev-2/soundexchange',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"stream_channel":"JAZZGROOVE-WEST","year":"2019","month":"12","performanceFactor1":".135","performanceFactor2":".244"})

};

app.post('/handler', function (req, res) {
  console.log(req.body);
  res.send(req.body);
});



app.post('/', function (req, res){
  rp(options)
    .then(function (parsedBody) {
        // POST succeeded...
      return res.json({"statusCode": "200", "body": parsedBody});
    })
    .catch(function (err) {
        // POST failed...
      return res.send(err)
    });


});




app.get('/', (req, res) => {
    return res.sendStatus(200);
})

//app.post('/', cors(), db.logEvent);






app.listen(PORT, () => console.log('App listening on port '+PORT+'\nAnd your name is ' + process.env.NAME + '.'));