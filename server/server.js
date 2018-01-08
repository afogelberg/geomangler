const express = require('express');
const routes = require('./routes/index');

module.exports = function server(opt_options) {
  const options = opt_options || {};
  const port = options.port || 3000;

  const app = express();

  app.get('/', function (req, res) {
    res.send('Geomangler server');
  });

  const server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('Geomangler server listening at http://%s:%s', host, port)
  });
}
