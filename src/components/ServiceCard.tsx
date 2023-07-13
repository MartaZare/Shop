import Counter from "./Counter";

interface ServiceCardProps {
  image: string;
  name: string;
  price: number;
  description: string;
  countHere: number[];
  setCountHere: (arg: number[]) => void;
  index: number;
}

export default function ServiceCard(props: ServiceCardProps) {
  return (
    <div className="card">
      <img src={props.image} alt="product_service_image"></img>
      <>
        <h1>{props.name}</h1>
        <h2>{props.price}</h2>
        <p>{props.description}</p>
      </>

      <Counter
        setCountHere={props.setCountHere}
        countHere={props.countHere}
        index={props.index}
      />
    </div>
  );
}
