const xmlserializer = require('xmlserializer');

function XMLSerializer() {
}

XMLSerializer.prototype.serializeToString = (node) => {
  xmlserializer.serializeToString(node);
};

module.exports = XMLSerializer;
