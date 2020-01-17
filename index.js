'use strict'
//Setup

const formidableMiddleware = require('express-formidable');
var fs = require('fs');
var path = require('path');
var Chart = require('chart.js');
var request = require('request');
const getCountryISO3 = require("country-iso-2-to-3");
var serveStatic = require('serve-static');

var express = require('express')
	, app = express();
const PORT = process.env.PORT || 3000;

var filename = "";



app.use(serveStatic('public', { 'index': ['index.html'] }))

var options = {
  'method': 'POST',
  'url': 'https://jjdxb1aex5.execute-api.us-west-2.amazonaws.com/dev-2/soundexchange',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"stream_channel":"JAZZGROOVE-WEST","year":"2019","month":"12","performanceFactor1":".135","performanceFactor2":".244"})

};

app.post('/', function (req, res){
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
});












app.listen(PORT, () => console.log('App listening on port '+PORT));