import { useCallback, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { API_URL } from "../other/Constants";
import { Product } from "../other/Types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setUserProducts } from "../reducers/userProductsSlice";

export default function Products() {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const checkout = useSelector((state: RootState) => state.checkout);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const getProducts = useCallback(
    (input: string, setter: (arg: Product[]) => void) => {
      fetch(`${API_URL}/products${input}`)
        .then((response) => response.json())
        .then((json) => {
          setter(json);
        });
    },
    []
  );

  useEffect(() => {
    getProducts("", setAllProducts);
  }, []);

  useEffect(() => {
    getProducts("?bought=false", setDisplayedProducts);
  }, [checkout]);

  async function displayOriginalProducts() {
    await Promise.all(
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
      })
    );

    for (let i = 13; i <= allProducts.length; i++) {
      await fetch(`${API_URL}/products/${i}`, {
        method: "DELETE",
      });
    }

    await fetch(`${API_URL}/products?createdBy=${currentUser}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(setUserProducts(json));
      });

    getProducts("", setDisplayedProducts);
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
