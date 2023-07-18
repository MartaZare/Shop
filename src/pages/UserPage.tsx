import React from "react";
import { Link } from "react-router-dom";

interface UserPageProps {
  currentUser: string;
}

function UserPage(props: UserPageProps) {
  const { currentUser } = props;

  function handleAdd() {}

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
    </div>
  );
}

export default UserPage;
