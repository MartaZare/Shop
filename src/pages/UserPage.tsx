import { Link } from "react-router-dom";
import UserProductCard from "../components/UserProductCard";
import { useSelector } from "react-redux";
import { RootState } from "../store";

// reload after removing user item from database
//databasdse state
//when it chnages you reload display user products (redux)
// after add it works

function UserPage() {
  const displayedProducts = useSelector(
    (state: RootState) => state.userProducts.userProducts
  );
  const currentUser = useSelector((state: RootState) => state.user);

  return (
    <div className="user">
      <div className="user-page-align">
        <div className="page user-page">
          <h1>Welcome {currentUser.currentUser}!</h1>
          <img src={"images/account.png"} alt="account-image" />
        </div>
      </div>

      <Link to="/user/new-product" className="add-btn">
        Add +
      </Link>

      <div className="all-cards-flex">
        <div className="all-cards">
          {displayedProducts.map((product) => (
            <UserProductCard
              image={product.image}
              name={product.name}
              price={product.price}
              description={product.description}
              id={product.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
