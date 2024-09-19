import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginEmailState, memberLevelState } from "../utils/RecoilData";
import Swal from "sweetalert2";

const NaverCallback = () => {
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code) {
      // 네이버 서버에 인증 코드로 로그인 요청
      axios
        .get(`${backServer}/member/naver-login?code=${code}&state=${state}`)
        .then((res) => {
          setLoginEmail(res.data.memberEmail);
          setMemberLevel(res.data.memberLevel);
          // 로그인 후 받은 토큰을 저장
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          window.localStorage.setItem("refreshToken", res.data.refreshToken);
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            text: "네이버 로그인에 실패했습니다.",
            icon: "error",
          });
        });
    }
  }, [backServer, navigate, setLoginEmail, setMemberLevel]);

  return <div>로딩...</div>;
};

export default NaverCallback;
