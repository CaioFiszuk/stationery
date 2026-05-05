import logo from "../assets/images/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {

  return (
    <header className="header">
        <img src={logo} alt="logo" className="header__logo"/>

        <nav className="header__nav">
          <ul className="header__menu">
            <li><Link to="/products?category=notebooks-and-pads" className="header__menu-item">Cadernos</Link></li>
            <li><Link to="/products?category=writing" className="header__menu-item">Escrita</Link></li>
            <li><Link to="/products?category=school-supplies" className="header__menu-item">Escolar</Link></li>
            <li><Link to="/products?category=art-and-drawing" className="header__menu-item">Arte</Link></li>
            <li><Link to="/products?category=accessories" className="header__menu-item">Acessórios</Link></li>
          </ul>

        <FaShoppingCart className="header__icon"/>
        </nav>
    </header>
  )
}

export default Header;
