// here we just sort by the price
export const sortByPrice = (type, data) => {
  if (type === "low_to_high") {
    return [...data].sort((a, b) => a.newPrice - b.newPrice);
  } else if (type === "high_to_low") {
    return [...data].sort((a, b) => b.newPrice - a.newPrice);
  }
  return data;
};

// We filter by the category the user selects
export const filterByCategory = (selectedCategory, data) => {
  if (!selectedCategory) return data;
  else {
    return data.filter(({ category }) =>
      selectedCategory.includes(category.toLowerCase())
    );
  }
};
// choice filter
export const filterByChoice = (selectedChoice, data) => {
  if (!selectedChoice || selectedChoice.toLowerCase() === "all") {
    return data;
  } else {
    return data.filter(
      ({ choice }) => choice.toLowerCase() === selectedChoice.toLowerCase()
    );
  }
};
// price range filter uses numeric vallues so we filter from the selectedPriceRange going down as the selectedPriceRange is used at the maximum value
export const filterByPriceRange = (selectedPriceRange, data) => {
  if (!selectedPriceRange) return data;
  else {
    return data.filter(({ priceRange }) => priceRange <= selectedPriceRange);
  }
};
// rate filter uses numerical values so we filter from the selectedRate going up as the selectedRate is used as the minimum value
export const filterByRating = (selectedRating, data) => {
  if (!selectedRating) return data;
  else {
    return data.filter(({ rate }) => rate >= selectedRating);
  }
};
// search filter
export const filterBySearch = (searchParams, data) => {
  if (!searchParams) return data;
  else {
    return data.filter(({ params }) =>
      searchParams.toLowerCase().includes(params.toLowerCase)
    );
  }
};
