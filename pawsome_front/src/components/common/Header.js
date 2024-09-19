import { Link } from "react-router-dom";
import "./default.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  loginEmailState,
  memberLevelState,
  isLoginState,
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
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const isLogin = useRecoilValue(isLoginState);

  console.log("test : ", loginEmail, memberLevel);

  const logout = () => {
    setLoginEmail("");
    setMemberLevel(0);
    delete axios.defaults.headers.common["Authorization"];
    window.localStorage.removeItem("refreshToken");
  };
  return (
    <ul className="user-menu">
      <li>
        {isLogin ? (
          <Link to="/login">로그인</Link>
        ) : (
          <Link to="#" onClick={logout}>
            로그아웃
          </Link>
        )}
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
