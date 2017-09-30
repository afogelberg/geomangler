module.exports = function(epsgCode) {
  var ogcString = 'urn:ogc:def:crs:';
  var epsg = ogcString.concat(epsgCode.replace(':', '::'));
  var crs = {
    type: 'name',
    properties: {
      name: epsg
    }
  }
  return crs;
}
