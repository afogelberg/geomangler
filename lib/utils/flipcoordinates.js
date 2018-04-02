module.exports = function flipCoordinates(features) {
  return features.map((feature) => {
    const clone = feature.clone();
    clone.getGeometry().applyTransform((input, output) => {
      let temp;
      for (let i = 0; i < input.length; i += 2) {
        temp = input[i];
        output[i] = input[i + 1];
        output[i + 1] = temp;
      }
      return output;
    });
    return clone;
  });
};
