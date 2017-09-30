var ol = require('openlayers');
var proj4 = require('proj4');
ol.proj.setProj4(proj4);
var projections = require('../conf/projections');
var updateFeatureDispacther = require('./dispatchers/updateFeaturesDispatcher')();

var olProjections = {};

module.exports = function() {

  if (projections.constructor === Array) {
    projections.forEach(function(projection) {
      if (projection.code && projection.projection) {
        var proj4projection = proj4.defs(projection.code, projection.projection);
      } else {
        console.log('Projection must have code and projection properties');
      }
      if (projection.alias) {
        proj4.defs(projection.alias, proj4.defs(projection.projection));
      }
      olProjections[projection.code] = new ol.proj.Projection({
        code: projection.code
      });
       ol.proj.addProjection(olProjections[projection.code]);
    })
  } else {
    console.log('Projections array not found');
  }

  return {
    get: get,
    transform: transform
  }
}

function get(epsgCode) {
  return olProjections[epsgCode];
}

function transform(features, options) {
  var sourceProjection = get(options.sourceProjection);
  var destinationProjection = get(options.destinationProjection);
  var transformed = features.map(function(feature) {
    feature.getGeometry().transform(sourceProjection, destinationProjection);
    return feature;
  });
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', transformed);
  return transformed;
}
