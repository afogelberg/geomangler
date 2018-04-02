require('module-alias/register');

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const XMLSerializer = require('./lib/utils/xml');

const dom = new JSDOM().window;
global.window = {};
global.document = dom.document;
global.Document = dom.Document;
global.Node = dom.Node;
global.DOMParser = dom.DOMParser;
global.XMLSerializer = XMLSerializer;
global.navigator = {
  userAgent: '',
};

const init = require('./lib/init');
const manglers = require('./lib/manglers');
const helpers = require('./lib/helpers');
const misc = require('./lib/misc');

const geomangler = (function geomangler(options = {}) {
  init(options);
  return Object.assign({}, misc, manglers, helpers);
}());

module.exports = geomangler;
