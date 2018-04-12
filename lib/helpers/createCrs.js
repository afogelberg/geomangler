module.exports = function createCrs(epsgCode) {
  const ogcString = 'urn:ogc:def:crs:';
  const epsg = ogcString.concat(epsgCode.replace(':', '::'));
  const crs = {
    type: 'name',
    properties: {
      name: epsg
    }
  };
  return crs;
};
