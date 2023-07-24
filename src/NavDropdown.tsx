import React from "react";
import { slide as Menu } from "react-burger-menu";
import VintedMode from "./VintedMode";
import { NavLink } from "react-router-dom";

export default class NavDropdown extends React.Component {
  showSettings(event: any) {
    event.preventDefault();
  }

  render() {
    return (
      <Menu>
        <VintedMode />
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/user">My Page</NavLink>
      </Menu>
    );
  }
}
