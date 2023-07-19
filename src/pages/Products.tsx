import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { API_URL } from "../other/Constants";
import { Product } from "../other/Types";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Products() {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const checkout = useSelector((state: RootState) => state.checkout);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((response) => response.json())
      .then((json) => {
        setAllProducts(json);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/products?bought=false`)
      .then((response) => response.json())
      .then((json) => {
        setDisplayedProducts(json);
      });
  }, [checkout]);

  function displayOriginalProducts() {
    allProducts.map((product) => {
      fetch(`${API_URL}/products/${product.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          bought: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    });

    for (let i = 11; i < allProducts.length; i++) {
      fetch(`${API_URL}/products/${i}`, {
        method: "DELETE",
      });
    }
  }

  return (
    <>
      <div className="products-page">
        <div className="all-cards-flex">
          <div className="all-cards">
            {displayedProducts.map((product) => (
              <ProductCard
                image={product.image}
                name={product.name}
                price={product.price}
                description={product.description}
                id={product.id}
                createdBy={product.createdBy}
              />
            ))}
          </div>
        </div>
        <button onClick={displayOriginalProducts}>Restock</button>
      </div>
    </>
  );
}
