'use strict'
//Setup

const formidableMiddleware = require('express-formidable');
var fs = require('fs');
var path = require('path');
var Chart = require('chart.js');
const getCountryISO3 = require("country-iso-2-to-3");
var serveStatic = require('serve-static');

var express = require('express')
	, app = express();
const PORT = process.env.PORT || 3000;

var filename = "";



app.use(serveStatic('public', { 'index': ['index.html'] }))



app.post('/', function (req, res){
  console.log('Post Received.')
});








app.listen(PORT, () => console.log('App listening on port '+PORT));