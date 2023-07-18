import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../other/Constants";
import { Product } from "../other/Types";
import UserProductCard from "../components/UserProductCard";

interface UserPageProps {
  currentUser: string;
}

function UserPage(props: UserPageProps) {
  const { currentUser } = props;
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

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
          <h1>Welcome {currentUser}!</h1>
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
              bought={product.bought}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
