interface SuccessfullPurchaseProps {
  checkoutSuccessful: boolean;
}

export default function SuccessfullPurchase(props: SuccessfullPurchaseProps) {
  return (
    <>
      {props.checkoutSuccessful && (
        <div className="successful-checkout">
          <img src="images/success.png" alt="success" />
          <h1>Payment successful!</h1>
        </div>
      )}
    </>
  );
}
