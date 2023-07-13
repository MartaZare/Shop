import ServiceCard from "./ServiceCard";
import ProductsData from "./ProductsData";

interface ProductsProps {
  productsCount: number[];
  setProductsCount: (args: number[]) => void;
}

export default function Products(props: ProductsProps) {
  console.log("IN PRODUCTS");
  console.log(props.productsCount);
  return (
    <div className="all-cards-flex">
      <div className="all-cards">
        {ProductsData().map((data, index) => (
          <ServiceCard
            image={data.image}
            name={data.name}
            price={data.price}
            description={data.description}
            setCountHere={props.setProductsCount}
            countHere={props.productsCount}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
