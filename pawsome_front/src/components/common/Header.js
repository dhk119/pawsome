import { Link } from "react-router-dom";
import "./default.css";
import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";

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
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <ul className="user-menu">
      <li>
        <Link to="/login">로그인</Link>
      </li>
      <li>
        <>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              {sidebar ? (
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              ) : (
                <FaIcons.FaBars onClick={showSidebar} />
              )}
            </Link>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icons}
                      <span>{item.title}</span>
                      <>
                        <ul className="sub-items">
                          {item.sub.map((subItem, i) => {
                            return (
                              <li key={subItem + i}>
                                <Link to={subItem.path}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      </li>
    </ul>
  );
};
export default Header;
