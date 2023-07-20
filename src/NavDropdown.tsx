import React from "react";
import { slide as Menu } from "react-burger-menu";

class NavDropdown extends React.Component {
  showSettings(event: any) {
    event.preventDefault();
  }

  render() {
    return (
      <Menu>
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/user">My Page</a>
      </Menu>
    );
  }
}

export default NavDropdown;
