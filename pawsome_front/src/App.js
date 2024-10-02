import { Route, Routes } from "react-router-dom";
import {
  loginEmailState,
  memberLevelState,
  memberNicknameState,
} from "./components/utils/RecoilData";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { useRecoilState } from "recoil";
import Join from "./components/member/Join";
import Login from "./components/member/Login";
import AdminMain from "./components/admin/AdminMain";
import Main from "./components/common/Main";
import InquiryMain from "./components/inquiry/InquiryMain";
import { useEffect } from "react";
import axios from "axios";
import BoardMain from "./components/board/BoardMain";
import NaverCallback from "./components/member/NaverCallback";
import MarketMain from "./components/market/MarketMain";
import ServiceMain from "./components/service/ServiceMain";
import NaverJoin from "./components/member/NaverJoin";
import MypageMain from "./components/member/MypageMain";
import PetInsert from "./components/member/PetInsert";
import ForgotPw from "./components/member/ForgotPw";
import ScrollToTop from "react-scroll-to-top";
import PetUpdate from "./components/member/PetUpdate";

function App() {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);

  useEffect(() => {
    refreshLogin();
    window.setInterval(refreshLogin, 60 * 60 * 1000);
  }, []);

  const refreshLogin = () => {
    const refreshToken = window.localStorage.getItem("refreshToken");
    if (refreshToken != null) {
      axios.defaults.headers.common["Authorization"] = refreshToken;
      axios
        .post(`${backServer}/member/refresh`)
        .then((res) => {
          console.log(res);
          setLoginEmail(res.data.memberEmail);
          setMemberLevel(res.data.memberLevel);
          setMemberNickname(res.data.memberNickname);
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          window.localStorage.setItem("refreshToken", res.data.refreshToken);
        })
        .catch((err) => {
          console.log(err);
          setLoginEmail("");
          setMemberLevel("");
          setMemberNickname("");
          delete axios.defaults.headers.common["Authorization"];
          window.localStorage.removeItem("refreshToken");
        });
    }
  };
  return (
    <div className="wrap">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPw" element={<ForgotPw />} />
          <Route path="/admin/*" element={<AdminMain />} />
          <Route path="/inquiry/*" element={<InquiryMain />} />
          <Route path="/*" element={<Main />} />
          <Route path="/board/*" element={<BoardMain />} />
          <Route path="/callback/naver" element={<NaverCallback />} />
          <Route path="/market/*" element={<MarketMain />} />
          <Route path="/mypage/*" element={<MypageMain />} />
          <Route path="/petinsert" element={<PetInsert />} />
          <Route path="/petUpdate" element={<PetUpdate />} />
          <Route path="/service/*" element={<ServiceMain />} />
          <Route path="/naverjoin" element={<NaverJoin />} />
        </Routes>
      </main>
      <Footer />
      <div className="up-btn">
        <ScrollToTop smooth />
      </div>
    </div>
  );
}

export default App;
