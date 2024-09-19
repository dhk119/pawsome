import { Route, Routes } from "react-router-dom";
import {
  loginEmailState,
  memberTypeState,
} from "./components/utils/RecoilData";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { useRecoilState } from "recoil";
import Join from "./components/member/Join";
import Login from "./components/member/Login";
import AdminMain from "./components/admin/AdminMain";

function App() {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  return (
    <div className="wrap">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/"></Route>
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<AdminMain />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
