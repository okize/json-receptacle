var express = require('express');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 8000;

// app.use(express.json());

app.configure(function(){
  app.use('/public', express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res) {
  res.send('nothing to see...');
});

app.post('/', function(req, res) {
  var body = '';
  filePath = __dirname + '/public/data.txt';
  req.on('data', function(data) {
    body += data;
  });

  req.on('end', function (){
    fs.appendFile(filePath, body, function() {
      res.send(JSON.stringify({response: 'json saved'}));
      res.end();
    });
  });
});

app.listen(port);
console.log('listening on port ' + port);