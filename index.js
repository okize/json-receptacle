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
  // app.use(express.json());
  app.use('/', express.static(__dirname + '/public'));
  app.use('/data', express.static(saveDir));
  app.use('/data', express.directory(saveDir));
});

app.get('/', function (req, res) {
  res.send('');
});

app.post('/', function (req, res) {

  req.on('data', function (data) {
    data = data;
  });

  req.on('end', function () {

    filename = moment().format('YYYY_MM_DD-HH_mm_ss') + '.json';

    fs.writeFile(path.resolve(saveDir, filename), data, function (err) {
      if (err) {
        return err;
      }
      res.send(JSON.stringify({response: filename + ' saved'}));
      res.end();
    });

  });

});

app.listen(port);

console.log('listening on port ' + port);