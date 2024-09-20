import { Link } from "react-router-dom";
import "./default.css";
import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { SidebarData } from "./SidebarData";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  loginEmailState,
  memberLevelState,
  isLoginState,
  memberNicknameState,
  loginNicknameState,
} from "../utils/RecoilData";
import axios from "axios";

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
          <Link to="/market/productList">마켓</Link>
        </li>
        <li>
          <Link to="/board/allList">커뮤니티</Link>
        </li>
      </ul>
    </nav>
  );
};
const HeaderLink = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const isLogin = useRecoilValue(isLoginState);

  console.log("test : ", loginEmail, memberLevel);

  const logout = () => {
    setLoginEmail("");
    setMemberLevel(0);
    setMemberNickname("");
    delete axios.defaults.headers.common["Authorization"];
    window.localStorage.removeItem("refreshToken");
  };
  return (
    <ul className="user-menu">
      <li>
        {isLogin ? (
          <>
            <Link to="#">장바구니</Link>
            <Link to="#" onClick={logout}>
              로그아웃
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
          </>
        )}
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
              <li>
                {isLogin ? (
                  <>
                    <Link to="/mypage">
                      <IoPersonCircleOutline />
                      {memberNickname}
                    </Link>
                  </>
                ) : (
                  ""
                )}
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icons}
                      <span>{item.title}</span>
                    </Link>
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
