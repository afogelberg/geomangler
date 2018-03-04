const express = require('express');

module.exports = function server(opt_options) {
  const options = opt_options || {};
  const port = options.port || 3000;

  const app = express();

  const server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('Geomangler server listening at http://%s:%s', host, port)
  });

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  return app;
};
