const proj4 = require('proj4');

global.proj4 = proj4;
const proj = require('@ol/proj');

proj.setProj4(proj4);
const projections = require('../conf/projections');

const setProjections = function setProjections() {
  if (projections.constructor === Array) {
    projections.forEach((projection) => {
      if (projection.code && projection.projection) {
        proj4.defs(projection.code, projection.projection);
      } else {
        console.log('Projection must have code and projection properties');
      }
      if (projection.alias) {
        proj4.defs(projection.alias, proj4.defs(projection.projection));
      }
    });
  } else {
    console.log('Projections array not found');
  }
};

const projection = () => ({
  setProjections
});

module.exports = projection();
