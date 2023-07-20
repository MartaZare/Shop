import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page-align">
      <div className="page">
        <h1>Welcome To The Quirky Cauldron!</h1>
        <p>
          Hail, wanderer! Welcome to my humble emporium, a place inspired by the
          globally renowned shop Vinted and many medieval RPG. Seeking a path to
          begin your noble journey? Why not venture forth to the hallowed
          grounds of the{" "}
          <Link to="/products" style={{ color: "#5C84D9" }}>
            products page
          </Link>
          ? Therein lies a trove of wonders waiting to be discovered!
        </p>

        <img src={"images/wizard.png"} alt="product_service_image" />
      </div>
    </div>
  );
}
