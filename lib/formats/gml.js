const Gml = require('@ol/format/gml');
const Feature = require('@ol/feature');
const fs = require('fs');
const prefixNode = require('../utils/prefixnode');
const flipCoordinates = require('../utils/flipcoordinates');
const saveToFile = require('../file/jsonfile');
const updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

function gmlToFeature(gmlGeometry, geometryName) {
  const ns = 'temp';
  const olGml = new Gml({
    featureNS: { ns },
    fetatureType: [ns],
  });
  const xmlParser = new DOMParser();
  const gmlString = `<${ns}><${geometryName}>${gmlGeometry}</${geometryName}></${ns}>`;
  const gmlNode = xmlParser.parseFromString(gmlString, 'text/xml');
  const dummy = new Feature();
  const gmlDoc = olGml.writeFeaturesNode([dummy]);
  gmlDoc.removeChild(gmlDoc.childNodes[0]);
  gmlDoc.appendChild(gmlNode.childNodes[0]);
  return olGml.readFeatures(gmlDoc)[0];
}

function read(gmlData) {
  const olGml = new Gml();
  const features = olGml.readFeatures(gmlData);
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
}

function add(path) {
  const data = fs.readFileSync(path, {
    encoding: 'utf8',
  });
  return read(data);
}

function readJSON(jsonLayer) {
  const geometryName = jsonLayer.geometryName || 'geometry';
  const features = jsonLayer.features.map((jsonFeature) => {
    const geometry = jsonFeature[geometryName];
    const feature = gmlToFeature(geometry, geometryName);
    delete jsonFeature[geometryName];
    feature.getProperties(jsonFeature);
    return feature;
  });
  return features;
}

function write(features, options) {
  const crs = options.epsgCode || 'EPSG:4326';
  const featureNS = 'featureNS' in options ? options.featureNS : {};
  const featureType = 'featureType' in options ? options.featureType : [];
  const olGml = new Gml({
    featureNS,
    fetatureType: featureType,
    srsName: crs,
  });
  const gmlLayer = olGml.writeFeatures(features);

  return gmlLayer;
}

function writeJSON(features, options) {
  const prefix = 'prefix' in options ? options.prefix : undefined;
  const flip = 'flipCoordinates' in options ? options.flipCoordinates : false;
  const crs = 'epsgCode' in options ? options.epsgCode : undefined;
  const gmlId = 'gmlId' in options ? options.gmlId : false;
  const gmlIdPrefix = 'gmlIdPrefix' in options ? options.gmlIdPrefix : 'gm';
  const featureNS = 'featureNS' in options ? options.featureNS : {};
  const featureType = 'featureType' in options ? options.featureType : [];
  const olGml = new Gml({
    featureNS,
    fetatureType: featureType,
    srsName: crs,
  });
  const xml = new XMLSerializer();
  const inputFeatures = flip ? flipCoordinates(features) : features;

  const jsonFeatures = inputFeatures.map((feature, index) => {
    const geometryName = feature.getGeometryName();
    const gmlEl = olGml.writeFeaturesNode([feature], {
      dataProjection: crs,
    });
    let geometry = gmlEl.getElementsByTagName(geometryName)[0];
    if (prefix) {
      geometry = prefixNode(geometry, prefix);
    }
    if (crs) {
      geometry.childNodes[0].setAttribute('srsName', crs);
    }
    if (gmlId) {
      const id = feature.getId() || index;
      geometry.childNodes[0].setAttribute('gml:id', `${gmlIdPrefix}_${id}`);
    }

    const props = feature.getProperties();
    delete props[geometryName];
    props[geometryName] = xml.serializeToString(geometry.childNodes[0]);
    return props;
  });
  return jsonFeatures;
}

function save(name, features, options) {
  const gmlLayer = write(features, options);
  name += '.gml';
  saveToFile(name, gmlLayer, options);
  return gmlLayer;
}

function gml() {
  return {
    add,
    read,
    readJSON,
    write,
    writeJSON,
    save,
  };
}

module.exports = gml;
