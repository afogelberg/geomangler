const rp = require('request-promise');
const parseString = require('xml2js').parseString;

module.exports = function getXmlasJson(url) {
  const options = {
    uri: url
  };
  const request = rp(options)
    .then((repos) => {
      let res;
      parseString(repos, {
        ignoreAttrs: true,
        explicitArray: false
      }, (err, result) => {
        res = result.Artiklar.Artikel;
      });
      return res;
    });
  return request;
};
