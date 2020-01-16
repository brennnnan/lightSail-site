'use strict';
var request = require('request');
var accessData = [];
var days = []
var sum = 0;
const bytesPerGb = 1073741824

function daysIntoYear(date){
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

function daysInMonth(monthNumber) {
  return new Date(2019, monthNumber, 0).getDate();
}

function dayOfInfo(_dayofyear, _uniqueIPs, _hitcount, _countryHits, _key, _bytes, _uniqueFiles) {
  this.day = _dayofyear;
  this.ipCount = _uniqueIPs;
  this.countries = _countryHits;
  this.key = _key;
  this.bytes = _bytes;
  this.uniqueFiles = _uniqueFiles;
  this.hits = _hitcount;
}

async function getAccessData(year, month, day) {
/*
  [new Date(startYear,startMonth,startDay), new Date(endYear,endMonth, endDay)]
    .forEach(d =>
       // console.log(`${d.toLocaleDateString()} is ${daysIntoYear(d)} days into the year`));
*/

  var now = new Date(year, month-1, day);
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  var oneDay = 1000 * 60 * 60 * 24;
  var dayofyear = Math.floor(diff / oneDay);
  //console.log('Month: '+month+', Day: '+day)
  //console.log('Day of year: ' + dayofyear);
  var url = 'https://s3.amazonaws.com/reports.s3stat.com/21357/dublab-audio-archives/stats/day'+year+''+month+''+day+'.json'



  await request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        var gb = Math.round(data.Bytes/bytesPerGb)
        sum += gb;
        // data is already parsed as JSON:
        //console.log(dayofyear)
        //console.log('Unique IPs: '+data.UniqueIPs);
        //console.log('Unique files: '+data.UniqueFiles);
        //console.log('Total GB: '+ gb+'\n')
        if(sum > 1000) {
          var thistotal = sum/1000;
          console.log('Monthly TB: '+thistotal+'\n\n')
        } else console.log('Monthly GB: '+sum+'\n\n')
        days.push(new dayOfInfo(dayofyear, data.UniqueIPs, data.hits, data.Countries, data.Key, data.Bytes, data.UniqueFiles))
        //console.log(days)
      }
  });

}

function getMonthOfObjects(year, month){
  for(var i=1; i<= daysInMonth(month); i++) {
    if(i<10) i = '0'+i+''
    getAccessData(year,month,i);
  }
}

function main() {
  getMonthOfObjects(2019,12);

}

main();

