import { API_URL } from "../other/Constants";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserProducts } from "../reducers/userProductsSlice";
import { RootState } from "../store";
import { deleteFromDatabase } from "../Api_calls";

interface UserProductCardProps {
  image: string;
  name: string;
  price: number;
  description: string;
  id: number;
}

export default function UserProductCard(props: UserProductCardProps) {
  const { image, name, price, description, id } = props;
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  async function handleDelete(id: number) {
    await deleteFromDatabase(id);

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

      <div className="user-card-btn">
        <Link to="/user/edit-product" state={id}>
          Edit
        </Link>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </div>
    </div>
  );
}
