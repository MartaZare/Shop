import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../other/Constants";
import { Product } from "../other/Types";
import UserProductCard from "../components/UserProductCard";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function UserPage() {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const currentUser = useSelector((state: RootState) => state.user);

  useEffect(() => {
    fetch(`${API_URL}/products?createdBy=${currentUser}`)
      .then((response) => response.json())
      .then((json) => {
        setDisplayedProducts(json);
      });
  }, []);

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
