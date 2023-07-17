import { useEffect, useState } from "react";
import { Product } from "../other/Types";
import { API_URL } from "../other/Constants";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  description: string;
  id: number;
  productsInCart: Product[];
  bought: boolean;
  setProductsInCart: (arg: Product[]) => void;
  checkoutSuccessful: boolean;
}

export default function ProductCard(props: ProductCardProps) {
  const {
    image,
    name,
    price,
    description,
    id,
    productsInCart,
    bought,
    setProductsInCart,
    checkoutSuccessful,
  } = props;

  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((response) => response.json())
      .then((json) => {
        setAllProducts(json);
      });
  }, []);

  function addBtnClick(id: number) {
    const updatedCart = [...productsInCart];
    let productToAdd: Product | undefined = allProducts.find(
      (product) => product.id === id
    );

    if (productToAdd) {
      updatedCart.push(productToAdd);
      setProductsInCart(updatedCart);
    }
  }

  function isProductInCart(): boolean {
    return productsInCart.some((product) => product.id === id);
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
