import { Route, Routes } from "react-router-dom";
import {
  loginEmailState,
  memberLevelState,
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

function App() {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);

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
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          window.localStorage.setItem("refreshToken", res.data.refreshToken);
        })
        .catch((err) => {
          console.log(err);
          setLoginEmail("");
          setMemberLevel("");
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
          <Route path="/admin/*" element={<AdminMain />} />
          <Route path="/inquiry/*" element={<InquiryMain />} />
          <Route path="/" element={<Main />} />
          <Route path="/board/*" element={<BoardMain />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
