const express = require('express');

const expressServer = function expressServer(options = {}) {
  const port = options.port || 3000;

  const app = express();

  const server = app.listen(port, () => {
    const host = server.address().address;

    console.log('Geomangler server listening at http://%s:%s', host, port);
  });

  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));

  return app;
};

module.exports = expressServer;
