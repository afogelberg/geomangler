var xml = document.implementation.createDocument(null, "temp");

module.exports = function prefixNode(node, prefix) {
  return replaceNode(node, prefix);
}

function replaceNode(parent, prefix) {
  var node = parent.firstChild;
  while (node) {
    var tagName = node.tagName;
    var el = xml.createElementNS('http://www.opengis.net/gml', prefix + ':' + tagName);
    var attributes = node.attributes;
    el.attributes = attributes;
    if (node.children.length) {
      var children = Array.prototype.slice.call(node.children);
      children.forEach(function(child) {
        el.appendChild(child);
      });
      replaceNode(el, prefix);
      node.parentNode.replaceChild(el, node);
    } else {
      if (node.childNodes[0].nodeValue) {
        el.appendChild(node.childNodes[0]);
      }
      node.parentNode.replaceChild(el, node);
    }
    node = node.nextSibling;
  }
  return parent;
}
