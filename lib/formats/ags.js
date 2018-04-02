const EsriJSON = require('@ol/format/esrijson');
const request = require('request-promise');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

/*
Format for ArcGIS Server Feature service
*/
module.exports = ags;

function ags() {
  return {
    add,
    read
  }
}

function add(options) {
  return makeRequest(options);
}

function read(esriJsonInput) {
  const olEsriJSON = new EsriJSON();
  const features = olEsriJSON.readFeatures(esriJsonInput);
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
}

function makeRequest(options) {
  const id = options.id || '0';
  const esriSrs = options.epsgCode.split(':').pop();
  const filter = 'filter' in options ? `&where=${options.filter}` : '';
  const bbox = 'bbox' in options ? createBbox(options.bbox, esriSrs) : '';

  const serverUrl = options.url.charAt(options.url.length - 1) === '/' ? `${options.url}${id}/query?` : `${options.url}/${id}/query?`;
  const params = encodeURI([
    `f=json`,
    `returnGeometry=true`,
    `inSR=${esriSrs}`,
    `outFields=*`,
    `returnIdsOnly=false`,
    `geometryPrecision=2`,
    `outSR=${esriSrs}${filter}${bbox}`
  ].join('&'));

  const url = `${serverUrl}${params}`;
  const requestOptions = {
    method: 'POST',
    uri: url,
    headers: {
      'content-type': 'application/json'
    },
    json: true
  };

  return request(requestOptions)
    .then((response) => {
      if (response.error) {
        return new Error(`${response.error.message}\n${response.error.details.join('\n')}`);
      } else {
        return read(response);
      }
    })
    .catch((e) => new Error(e));
}

function createBbox(bbox, esriSrs) {
  const geometry = JSON.stringify({
    xmin: bbox[0],
    ymin: bbox[1],
    xmax: bbox[2],
    ymax: bbox[3],
    spatialReference: {
      wkid: esriSrs
    }
  });
  return `&geometry=${geometry}&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects`;
}
