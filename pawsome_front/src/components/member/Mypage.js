import "./mypage.css";
import {
  loginEmailState,
  memberLevelState,
  isLoginState,
  memberNicknameState,
} from "../utils/RecoilData";
import { useRecoilState, useRecoilValue } from "recoil";

const Mypage = () => {
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const isLogin = useRecoilValue(isLoginState);

  return (
    <div className="mypage-body">
      <div className="side-bar">
        <div className="user-info">
          <div className="profile-img"></div>
          <div>{memberNickname}</div>
        </div>
        <div className="profile-menu">
          <ul>
            <li>프로필</li>
            <li>일정</li>
            <li>주문조회</li>
          </ul>
        </div>
      </div>
      <div className="mypage-wrap">
        <div className="profile-card">
          <img />
          test
        </div>
        <div className="pet-card">
          <img />
          test
        </div>
      </div>
    </div>
  );
};

export default Mypage;
