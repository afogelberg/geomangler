var xmlserializer = require('xmlserializer');

function XMLSerializer() {
}

XMLSerializer.prototype.serializeToString = function(node) {
    return xmlserializer.serializeToString(node);
};

module.exports = XMLSerializer;
