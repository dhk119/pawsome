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
import ChangePw from "./ChangePw";
import PetView from "./PetView";
import DeleteMember from "./DeleteMember";
import BuyList from "./BuyList";
import ProductLike from "./ProductLike";
import BuyView from "./BuyView";
import axios from "axios";
import { useEffect, useState } from "react";

const MypageMain = () => {
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const isLogin = useRecoilValue(isLoginState);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [member, setMember] = useState({});

  useEffect(() => {
    axios
      .post(`${backServer}/member/profile`)
      .then((res) => {
        console.log(res);
        setMember(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginEmail]);

  return (
    <div className="mypage-body">
      <div className="side-bar">
        <div className="user-info">
          <div>
            <img
              className="profile-img"
              src={`${backServer}/member/profile/${member.memberProfile}`}
            />
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
              <Link to="/mypage/buy-list">주문조회</Link>
            </li>
            <li>
              <Link to="/mypage/product-like">좋아요한 상품</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mypage-wrap">
        <Routes>
          <Route path="/profile" element={<MypageProfile />} />
          <Route path="/calendar" element={<MypageCalendar />} />
          <Route path="/updateMember" element={<UpdateMember />} />
          <Route path="/change-pw" element={<ChangePw />} />
          <Route path="/pet-view/:petNo" element={<PetView />} />
          <Route path="/deleteMember/:memberEmail" element={<DeleteMember />} />
          <Route path="/buy-list" element={<BuyList />} />
          <Route path="/product-like" element={<ProductLike />} />
          <Route path="/buy-view/:payUid" element={<BuyView />} />
        </Routes>
      </div>
    </div>
  );
};

export default MypageMain;
