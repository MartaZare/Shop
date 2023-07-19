import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { API_URL } from "../other/Constants";
import { Product } from "../other/Types";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Products() {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const checkout = useSelector((state: RootState) => state.checkout);

  useEffect(() => {
    fetch(`${API_URL}/products?bought=false`)
      .then((response) => response.json())
      .then((json) => {
        setDisplayedProducts(json);
      });
  }, [checkout]);

  return (
    <div className="all-cards-flex">
      <div className="all-cards">
        {displayedProducts.map((product) => (
          <ProductCard
            image={product.image}
            name={product.name}
            price={product.price}
            description={product.description}
            id={product.id}
            bought={product.bought}
          />
        ))}
      </div>
    </div>
  );
}
