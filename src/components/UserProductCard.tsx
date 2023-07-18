import { API_URL } from "../other/Constants";

interface UserProductCardProps {
  image: string;
  name: string;
  price: number;
  description: string;
  id: number;
  bought: boolean;
}

function UserProductCard(props: UserProductCardProps) {
  const { image, name, price, description, id, bought } = props;

  function handleDelete(id: number) {
    fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });
    console.log("fucntion is called");
  }

  return (
    <div key={id} className={"card"}>
      <img src={image} alt="product_product_image"></img>
      <>
        <h1>{name}</h1>
        <h2>{price}</h2>
        <p>{description}</p>
      </>

      <button>Edit</button>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
}

export default UserProductCard;
