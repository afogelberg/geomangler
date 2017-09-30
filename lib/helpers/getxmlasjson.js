var rp = require('request-promise');
var parseString = require('xml2js').parseString;

module.exports = function getXmlasJson(url) {

var options = {
  // method: 'POST',
  uri: url
};
var request = rp(options)
                .then(function (repos) {
                  var res;
                  parseString(repos, {ignoreAttrs: true, explicitArray: false}, function(err, result) {
                    res = result.Artiklar.Artikel;
                  });
                  return res;
                });
return request;
};
