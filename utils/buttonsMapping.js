const buttonsMapping = json => {
  /* This function is mapping facets buttons */

  function toObject(names, values) {
    var result = {};
    for (var i = 0; i < names.length; i++) result[names[i]] = values[i];
    return result;
  }

  let dynamicButtonTemp = {};
  if (json[2].facets.length > 2) {
    json[2].facets[2].Other.map(other => {
      let name = other.name;

      const arrayIndex = [];
      let value = other.facetValues
        .filter((value, index) => {
          if (value.count > 0) {
            arrayIndex.push(index);
            return true;
          } else {
            return false;
          }
        })
        .map(value => true);
      value = toObject(arrayIndex, value);
      dynamicButtonTemp[name] = { ...value };
    });
  }
  let priceIndexValues = [];
  let priceValue = json[2].facets[0].Price.filter((price, index) => {
    if (price.count > 0) {
      priceIndexValues.push(index);
      return true;
    } else {
      return false;
    }
  }).map(price => true);
  priceValue = toObject(priceIndexValues, priceValue);

  let reviewIndexValues = [];
  let reviewValue = json[2].facets[1].Reviews.filter((review, index) => {
    if (review.count > 0) {
      reviewIndexValues.push(index);
      return true;
    } else {
      return false;
    }
  }).map(review => {
    return true;
  });

  reviewValue = toObject(reviewIndexValues, reviewValue);

  let staticFacetsButtonsTemp = {
    Price: {
      ...priceValue
    },
    Reviews: {
      ...reviewValue
    }
  };

  return {
    ...staticFacetsButtonsTemp,
    ...dynamicButtonTemp
  };
};
export default buttonsMapping;
