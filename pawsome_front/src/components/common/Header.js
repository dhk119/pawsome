import { Link } from "react-router-dom";
import "./default.css";

const Header = () => {
  return (
    <header className="header">
      <div>
        <div className="logo">
          <Link to="/">
            <img
              src="/image/pawsomelogo.png"
              style={{ width: "130px", height: "100px" }}
            />
          </Link>
        </div>
        <MainNavi />
        <HeaderLink />
      </div>
    </header>
  );
};

const MainNavi = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="#">시설</Link>
        </li>
        <li>
          <Link to="#">마켓</Link>
        </li>
        <li>
          <Link to="#">커뮤니티</Link>
        </li>
      </ul>
    </nav>
  );
};

const HeaderLink = () => {
  return (
    <ul className="user-menu">
      <li>
        <Link to="#">로그인</Link>
      </li>
      <li>
        <span
          className="material-icons burger-menu"
          style={{ color: "#ffbe58" }}
        >
          menu
        </span>
      </li>
    </ul>
  );
};
export default Header;
