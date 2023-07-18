import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { API_URL } from "../other/Constants";
import { Product } from "../other/Types";

interface ProductsProps {
  productsInCart: Product[];
  setProductsInCart: (arg: Product[]) => void;
  checkoutSuccessful: boolean;
}

export default function Products(props: ProductsProps) {
  const { productsInCart, setProductsInCart, checkoutSuccessful } = props;
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/products?bought=false`)
      .then((response) => response.json())
      .then((json) => {
        setDisplayedProducts(json);
      });
  }, [checkoutSuccessful]);

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
            productsInCart={productsInCart}
            bought={product.bought}
            setProductsInCart={setProductsInCart}
            checkoutSuccessful={checkoutSuccessful}
          />
        ))}
      </div>
    </div>
  );
}
