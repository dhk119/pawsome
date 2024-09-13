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

export default Header;
