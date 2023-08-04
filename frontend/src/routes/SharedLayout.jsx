import React, { useEffect } from "react";
import { useProductsContext } from "../contexts";

function SharedLayout() {
  const [loadingData, setLoadingData] = useState(false);
  const { loading } = useProductsContext();
  const { loadingCart } = useProductsContext();
  const { loadingWishList } = useProductsContext();

  useEffect(() => {
    setLoadingData(true);

    const id = setTimeout(() => {
      setLoadingData(false);
    }, 2000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return <div></div>;
}

export default SharedLayout;
