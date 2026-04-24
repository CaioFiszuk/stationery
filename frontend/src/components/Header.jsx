import logo from "../assets/images/logo.png";
import { FaShoppingCart } from "react-icons/fa";

function Header() {

  return (
    <header className="header">
        <img src={logo} alt="logo" className="header__logo"/>

        <nav className="header__nav">
          <ul className="header__menu">
            <li className="header__menu-item">Cadernos</li>
            <li className="header__menu-item">Escrita</li>
            <li className="header__menu-item">Escolar</li>
            <li className="header__menu-item">Desenho</li>
            <li className="header__menu-item">Acessórios</li>
          </ul>

        <FaShoppingCart className="header__icon"/>
        </nav>
    </header>
  )
}

export default Header;
