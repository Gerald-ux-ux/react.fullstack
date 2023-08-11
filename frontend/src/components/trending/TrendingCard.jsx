import React from "react";
import { Link } from "react-router-dom";

const TrendingCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`}>
      <div className="">
        <div className="">
          <h1>{product.name}</h1>
        </div>
      </div>
    </Link>
  );
};

export default TrendingCard;
