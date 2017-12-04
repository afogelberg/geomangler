var express = require('express');

module.exports = function server(opt_options) {
  var options = opt_options || {};

  var app = express();

  app.get('/', function (req, res) {
    res.send('hello world');
  });

  var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('Geomangler server listening at http://%s:%s', host, port)
  });
}
