const xml = document.implementation.createDocument(null, 'temp');

function replaceNode(parent, prefix) {
  let node = parent.firstChild;
  while (node) {
    const {
      tagName
    } = node.tagName;
    const el = xml.createElementNS('http://www.opengis.net/gml', `${prefix}:${tagName}`);
    const {
      attributes
    } = node.attributes;
    el.attributes = attributes;
    if (node.children.length) {
      const children = Array.prototype.slice.call(node.children);
      children.forEach((child) => {
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

module.exports = function prefixNode(node, prefix) {
  return replaceNode(node, prefix);
};
