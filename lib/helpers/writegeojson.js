const jsonfile = require('jsonfile');
const createCrs = require('./createcrs');

let crs;
let path;

function writeFile(layerName, geojsonLayer) {
  const file = path.concat(layerName, '.geojson');
  geojsonLayer.crs = crs;
  jsonfile.writeFile(file, geojsonLayer, {
    spaces: 2,
    encoding: 'utf8'
  }, () => {});
}

module.exports = function writeGeojson(geojsonLayer, options = {}) {
  const epsgCode = options.epsgCode || 'EPSG:4326';
  crs = createCrs(epsgCode);
  path = options.path || '/';

  const layerNames = Object.getOwnPropertyNames(geojsonLayer);
  layerNames.forEach((layerName) => {
    const layer = geojsonLayer[layerName];
    writeFile(layerName, layer);
  });
};
