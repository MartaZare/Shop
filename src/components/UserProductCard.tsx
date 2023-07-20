import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../other/Constants";
import { setUserProducts } from "../reducers/userProductsSlice";
import { RootState } from "../store";

interface UserProductCardProps {
  image: string;
  name: string;
  price: number;
  description: string;
  id: number;
}

function UserProductCard(props: UserProductCardProps) {
  const { image, name, price, description, id } = props;
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  async function handleDelete(id: number) {
    await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });

    await fetch(`${API_URL}/products?createdBy=${currentUser}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(setUserProducts(json));
      });
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
