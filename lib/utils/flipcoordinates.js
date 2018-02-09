module.exports = function flipCoordinates(features) {
  return features.map(function(feature) {
    var clone = feature.clone();
    clone.getGeometry().applyTransform(function(input, output) {
      var temp;
      for (var i = 0; i < input.length; i += 2) {
        temp = input[i];
        output[i] = input[i + 1];
        output[i + 1] = temp;
      }
      return output;
    });
    return clone;
  });
}
