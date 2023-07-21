import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";

export default function Home() {
  const mode = useSelector((state: RootState) => state.mode);

  return (
    <div className="page-align">
      <div className="page">
        {mode && (
          <>
            <h1>Welcome, Vinted recruiters!</h1>
            <p>
              <b>Thanks for visiting my page!</b> I have poured my heart and
              soul into creating this <b>custom-made</b> project for You. Here
              an ordinary shop page is transformed into an <b>RPG-style </b>
              shop, adding some <b>adventurous elements</b>. I am
              <b> genuinely excited</b> to apply for Vinted Engineering Academy,
              and I look forward to Your feedback! Warmest regards, Marta :)
            </p>

            <img src={"images/woman.png"} alt="woman_image" />
          </>
        )}

        {!mode && (
          <>
            <h1>Welcome To The Quirky Cauldron!</h1>
            <p>
              Hail, wanderer! Welcome to my humble emporium, a place inspired by
              the globally renowned shop Vinted and many medieval RPG. Seeking a
              path to begin your noble journey? Why not venture forth to the
              hallowed grounds of the{" "}
              <Link to="/products" style={{ color: "#5C84D9" }}>
                products page
              </Link>
              ? Therein lies a trove of wonders waiting to be discovered!
            </p>

            <img src={"images/wizard.png"} alt="wizard_image" />
          </>
        )}
      </div>
    </div>
  );
}
