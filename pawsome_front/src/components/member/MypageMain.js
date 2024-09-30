import "./mypage.css";
import {
  loginEmailState,
  memberLevelState,
  isLoginState,
  memberNicknameState,
} from "../utils/RecoilData";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link, Route, Routes } from "react-router-dom";
import MypageProfile from "./MypageProfile";
import MypageCalendar from "./MypageCalendar";
import UpdateMember from "./UpdateMember";

const MypageMain = () => {
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const isLogin = useRecoilValue(isLoginState);

  return (
    <div className="mypage-body">
      <div className="side-bar">
        <div className="user-info">
          <div>
            <img className="profile-img" src="/image/paw.png" />
          </div>
          <div>{memberNickname}</div>
        </div>
        <div className="profile-menu">
          <ul>
            <li>
              <Link to="/mypage/profile">프로필</Link>
            </li>
            <li>
              <Link to="/mypage/calendar">일정</Link>
            </li>
            <li>
              <Link to="#">주문조회</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mypage-wrap">
        <Routes>
          <Route path="/profile" element={<MypageProfile />} />
          <Route path="/calendar" element={<MypageCalendar />} />
          <Route path="/updateMember" element={<UpdateMember />} />
        </Routes>
      </div>
    </div>
  );
};

export default MypageMain;
