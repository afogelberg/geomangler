var Gml = require('ol/format/gml');
var Feature = require('ol/feature');
var fs = require('fs');
var createCrs = require('../helpers/createcrs');
var prefixNode = require('../utils/prefixnode');
var flipCoordinates = require('../utils/flipcoordinates');
var saveToFile = require('../file/jsonfile');
var xmlDoc = document.implementation.createDocument(null, "temp");
var updateFeatureDispacther = require('../dispatchers/updatefeaturesdispatcher')();

module.exports = gml;

function gml() {
  return {
    add: add,
    read: read,
    readJSON: readJSON,
    write: write,
    writeJSON: writeJSON,
    save: save
  }
}

function add(path) {
  var data = fs.readFileSync(path, {
    encoding: 'utf8'
  });
  return read(data);
}

function read(gmlData) {
  var olGml = new Gml();
  var features = olGml.readFeatures(gmlData);
  updateFeatureDispacther.dispatchUpdateFeature('updateFeatures', features);
  return features;
}

function readJSON(jsonLayer, options) {
  var geometryName = jsonLayer.geometryName || 'geometry';
  var features = jsonLayer.features.map(function(jsonFeature) {
    var geometry = jsonFeature[geometryName];
    var feature = gmlToFeature(geometry, geometryName);
    delete jsonFeature[geometryName];
    feature.getProperties(jsonFeature);
    return feature;
  });
  return features;
}

function write(features, options) {
  var crs = options.epsgCode || 'EPSG:4326';
  var featureNS = 'featureNS' in options ? options.featureNS : {};
  var featureType = 'featureType' in options ? options.featureType : [];
  var olGml = new Gml({
    featureNS: featureNS,
    fetatureType: featureType,
    srsName: crs
  });
  var gmlLayer = olGml.writeFeatures(features);

  return gmlLayer;
}

function writeJSON(features, options) {
  var prefix = 'prefix' in options ? options.prefix : undefined;
  var flip = 'flipCoordinates' in options ? options.flipCoordinates : false;
  var crs = 'epsgCode' in options ? options.epsgCode : undefined;
  var gmlId = 'gmlId' in options ? options.gmlId : false;
  var gmlIdPrefix = 'gmlIdPrefix' in options ? options.gmlIdPrefix : 'gm';
  var featureNS = 'featureNS' in options ? options.featureNS : {};
  var featureType = 'featureType' in options ? options.featureType : [];
  var olGml = new Gml({
    featureNS: featureNS,
    fetatureType: featureType,
    srsName: crs
  });
  var xml = new XMLSerializer();
  var inputFeatures = flip ? flipCoordinates(features) : features;

  var jsonFeatures = inputFeatures.map(function(feature, index) {
    var geometryName = feature.getGeometryName();
    var gmlEl = olGml.writeFeaturesNode([feature], {
      dataProjection: crs
    });
    var geometry = gmlEl.getElementsByTagName(geometryName)[0];
    if (prefix) {
      geometry = prefixNode(geometry, prefix);
    }
    if (crs) {
      geometry.childNodes[0].setAttribute('srsName', crs);
    }
    if (gmlId) {
      var id = feature.getId() || index;
      geometry.childNodes[0].setAttribute('gml:id', `${gmlIdPrefix}_${id}`);
    }

    var props = feature.getProperties();
    delete props[geometryName];
    props[geometryName] = xml.serializeToString(geometry.childNodes[0]);
    return props;
  });
  return jsonFeatures;
}

function save(name, features, options) {
  var gmlLayer = write(features, options);
  name += '.gml';
  saveToFile(name, gmlLayer, options);
  return gmlLayer;
}

function gmlToFeature(gmlGeometry, geometryName) {
  var ns = 'temp';
  var olGml = new Gml({
    featureNS: {ns: ns},
    fetatureType: [ns]
  });
  var xmlParser = new DOMParser();
  var gmlString = `<${ns}><${geometryName}>${gmlGeometry}</${geometryName}></${ns}>`;
  var gmlNode = xmlParser.parseFromString(gmlString, "text/xml");
  var dummy = new Feature();
  var gmlDoc = olGml.writeFeaturesNode([dummy]);
  gmlDoc.removeChild(gmlDoc.childNodes[0]);
  gmlDoc.appendChild(gmlNode.childNodes[0]);
  return olGml.readFeatures(gmlDoc)[0];
}
