import { useNavigate } from "react-router-dom";
import { API_URL } from "../other/Constants";

interface UserProductCardProps {
  image: string;
  name: string;
  price: number;
  description: string;
  id: number;
}

function UserProductCard(props: UserProductCardProps) {
  const { image, name, price, description, id } = props;
  const navigate = useNavigate();

  function handleDelete(id: number) {
    fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });

    navigate("/");
  }

  return (
    <div key={id} className={"card"}>
      <img src={image} alt="product_product_image" />
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
