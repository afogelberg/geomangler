global.proj4 = require('proj4');
var proj = require('@ol/proj');
proj.setProj4(proj4);
var projections = require('../conf/projections');

module.exports = function() {

  return {
    setProjections: setProjections
  }
}()

function setProjections() {
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
    })
  } else {
    console.log('Projections array not found');
  }
}
