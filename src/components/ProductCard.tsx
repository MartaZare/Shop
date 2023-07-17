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
    setProductsInCart,
    checkoutSuccessful,
  } = props;

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [bought, setBought] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((response) => response.json())
      .then((json) => {
        setAllProducts(json);
      });
  }, []);

  // useEffect(() => {
  //   if (checkoutSuccessful) {
  //     setBought(true);
  //   }
  // }, [checkoutSuccessful]);

  function addBtnClick(id: number) {
    const updatedCart = [...productsInCart];
    let productToAdd: Product | undefined = allProducts.find(
      (product) => product.id === id
    );

    if (productToAdd) {
      updatedCart.push(productToAdd);
      setProductsInCart(updatedCart);
      setBought(true);
    }
  }

  const cardStyles = {
    opacity: bought ? "0.4" : "initial",
  };

  return (
    <div
      key={id}
      className={`card ${bought ? "bought" : ""}`}
      style={cardStyles}
    >
      <img src={image} alt="product_product_image"></img>
      <>
        <h1>{name}</h1>
        <h2>{price}</h2>
        <p>{description}</p>
      </>

      <button
        className={`add-product-btn `}
        onClick={() => addBtnClick(id)}
        disabled={bought}
      >
        {bought ? "In cart" : "Add"}
      </button>
    </div>
  );
}
