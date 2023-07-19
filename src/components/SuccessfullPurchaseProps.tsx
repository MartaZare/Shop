import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function SuccessfullPurchase() {
  const checkout = useSelector((state: RootState) => state.checkout);

  return (
    <>
      {checkout === true && (
        <div className="successful-checkout">
          <img src="images/success.png" alt="success" />
          <h1>Payment successful!</h1>
        </div>
      )}
    </>
  );
}
