import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setUserProducts } from "../reducers/userProductsSlice";
import ProductCard from "../components/ProductCard";
import { API_URL } from "../other/Constants";
import { Product } from "../other/Types";
import {
  changeProductBoughtState,
  deleteFromDatabase,
  getOriginalProductsCount,
  getProducts,
} from "../Api_calls";

export default function Products() {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const checkout = useSelector((state: RootState) => state.checkout);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts("products", "", setAllProducts);
  }, []);

  useEffect(() => {
    getProducts("products", "?bought=false", setDisplayedProducts);
  }, [checkout]);

  async function displayOriginalProducts() {
    await Promise.all(
      allProducts.map((product) => {
        changeProductBoughtState(product, false);
      })
    );

    let originalProductsCount = await getOriginalProductsCount();

    for (let i = originalProductsCount + 1; i <= allProducts.length; i++) {
      await deleteFromDatabase(i);
    }

    await fetch(`${API_URL}/products?createdBy=${currentUser}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(setUserProducts(json));
      });

    getProducts("products", "", setDisplayedProducts);
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
