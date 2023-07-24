import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import VintedMode from "./VintedMode";

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsVisible(window.innerWidth < 600);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="navigation">
      {!isVisible && (
        <nav className="main-navigation">
          <VintedMode />

          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/products" className="nav-link">
                Products
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/user" className="nav-link">
                My page
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {isVisible && <NavDropdown />}
    </div>
  );
}
