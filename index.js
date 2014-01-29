var fs = require('fs');
var path = require('path');
var moment = require('moment');
var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var saveDir = path.resolve(__dirname, 'public', 'data');
var filename = '';
var data = '';

app.configure(function () {
  app.use(express.urlencoded());
  app.use(express.json());
  app.use('/', express.static(__dirname + '/public'));
  app.use('/data', express.static(saveDir));
  app.use('/data', express.directory(saveDir));
});

app.get('/', function (req, res) {
  res.send('');
});

app.post('/', function (req, res) {

  filename = req.query.filename || moment().format('YYYY_MM_DD-HH_mm_ss') + '.json';
  data = JSON.stringify(req.body, null, 2);

  fs.writeFile(path.resolve(saveDir, filename), data, function (err) {
    if (err) throw err;
    res.send(JSON.stringify({res: filename + ' saved'}));
  });

});

app.listen(port);

console.log('listening on port ' + port);