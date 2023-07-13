import ServiceCard from "./ServiceCard";
import ServiceData from "./ServiceData";

interface ServicesProps {
  serviceCount: number[];
  setServiceCount: (arg: number[]) => void;
}

export default function Services(props: ServicesProps) {
  return (
    <div className="all-cards-flex">
      <div className="all-cards">
        {ServiceData().map((data, index) => (
          <ServiceCard
            image={data.image}
            name={data.name}
            price={data.price}
            description={data.description}
            setCountHere={props.setServiceCount}
            countHere={props.serviceCount}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
