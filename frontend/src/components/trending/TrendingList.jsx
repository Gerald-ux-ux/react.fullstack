import React from "react";
import { useProductsContext } from "../../contexts";
import TrendingCard from "./TrendingCard";

const TrendingList = () => {
  const { trendingProducts } = useProductsContext();
  return (
    <section>
      <h1>Trending Products</h1>
      {trendingProducts.map((product) => {
        return <TrendingCard key={product._id} product={product} />;
      })}
    </section>
  );
};

export default TrendingList;
