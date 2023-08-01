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
// price range filter
export const filterByPriceRange = () => {};
// rate filter
export const filterByRating = () => {};
// search filter
export const filterBySearch = () => {};
