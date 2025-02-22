import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import {
  loginEmailState,
  memberLevelState,
  memberNicknameState,
} from "../utils/RecoilData";
import "./member.css";

const Login = () => {
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [member, setMember] = useState({ memberEmail: "", memberPw: "" });
  const navigate = useNavigate();

  const changeMember = (e) => {
    const name = e.target.name;
    setMember({ ...member, [name]: e.target.value });
  };

  // 엔터 키 감지 함수
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      login(); // 엔터 키를 누르면 로그인 실행
    }
  };

  // 네이버 로그인
  const NAVER_CLIENT_ID = "mDIMmlDCzICGJPSiZ68R";
  const REDIRECT_URI = "http://192.168.10.16:3000/callback/naver"; // Callback URL
  const STATE = "flase";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

  // 카카오 로그인
  const KAKAO_CLIENT_ID = "655bae51c4f48e73787fb78710604be0";
  const KAKAO_REDIRECT_URI = "http://192.168.10.16:3000/callback/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`;

  const NaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  const KakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const login = () => {
    if (member.memberEmail === "" || member.memberPw === "") {
      Swal.fire({
        text: "이메일 또는 비밀번호를 입력하세요",
        icon: "info",
      });
      return;
    }
    axios
      .post(`${backServer}/member/login`, member)
      .then((res) => {
        console.log(res);
        setLoginEmail(res.data.memberEmail);
        setMemberLevel(res.data.memberLevel);
        setMemberNickname(res.data.memberNickname);

        axios.defaults.headers.common["Authorization"] = res.data.accessToken;
        window.localStorage.setItem("refreshToken", res.data.refreshToken);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          text: "이메일 또는 비밀번호를 확인해주세요.",
          icon: "warning",
        });
      });
  };

  return (
    <div className="body">
      <div className="login-page">
        <div className="form">
          <h2>로그인</h2>
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <input
              type="text"
              name="memberEmail"
              id="memberEmail"
              value={member.memberEmail}
              onChange={changeMember}
              onKeyPress={handleKeyPress}
              placeholder="이메일"
            />
            <input
              type="password"
              name="memberPw"
              id="memberPw"
              value={member.memberPw}
              onChange={changeMember}
              onKeyPress={handleKeyPress}
              placeholder="비밀번호"
            />
            <button className="submit" type="submit">
              로그인
            </button>
            <p className="message">
              계정이 없으신가요?
              <Link to="/join" className="join">
                회원가입
              </Link>
            </p>
            <p className="message">
              <Link to="/forgotPw" className="join">
                비밀번호를 잊으셨나요?
              </Link>
            </p>
          </form>
          <h3>간편하게 로그인 하기</h3>
          <div className="social-login">
            <img onClick={NaverLogin} src="/image/naver_btn.png" />
            <img onClick={KakaoLogin} src="/image/kakao_btn.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
