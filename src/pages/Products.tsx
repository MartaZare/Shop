import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { API_URL } from "../other/Constants";
import { Product } from "../other/Types";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const checkout = useSelector((state: RootState) => state.checkout);
  const navigate = useNavigate();

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

  function displayAllProducts() {
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

    navigate("/");
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
              />
            ))}
          </div>
        </div>
        <button onClick={displayAllProducts}>Restock</button>
      </div>
    </>
  );
}
