import { useEffect, useState } from "react";
import { Product } from "../other/Types";
import { API_URL } from "../other/Constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addToCart } from "../reducers/cartSlice";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  description: string;
  id: number;
}

export default function ProductCard(props: ProductCardProps) {
  const { image, name, price, description, id } = props;
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const cartProducts = useSelector((state: RootState) => state.products);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((response) => response.json())
      .then((json) => {
        setAllProducts(json);
      });
  }, []);

  function addBtnClick(id: number) {
    let productToAdd: Product | undefined = allProducts.find(
      (product) => product.id === id
    );

    if (productToAdd) {
      if (!cartProducts.find((product) => product.id === productToAdd!.id)) {
        dispatch(addToCart(productToAdd));
      }
    }
  }

  function isProductInCart(): boolean {
    return cartProducts.some((product) => product.id === id);
  }

  return (
    <div key={id} className={"card"}>
      <img src={image} alt="product_product_image"></img>
      <>
        <h1>{name}</h1>
        <h2>{price}</h2>
        <p>{description}</p>
      </>

      <button
        className={`add-product-btn `}
        onClick={() => addBtnClick(id)}
        disabled={isProductInCart()}
      >
        {isProductInCart() ? "In cart" : "Add"}
      </button>
    </div>
  );
}
