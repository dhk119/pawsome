import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  loginEmailState,
  memberLevelState,
  memberNicknameState,
} from "../utils/RecoilData";
import Swal from "sweetalert2";

const NaverCallback = () => {
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  useRecoilState(memberNicknameState);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code) {
      axios
        .get(`${backServer}/member/naver-login?code=${code}&state=${state}`)
        .then((res) => {
          setLoginEmail(res.data.memberEmail);
          setMemberLevel(res.data.memberLevel);
          setMemberNickname(res.data.memberNickname);
          if (res.data.isMember) {
            axios.defaults.headers.common["Authorization"] =
              res.data.accessToken;
            window.localStorage.setItem("refreshToken", res.data.refreshToken);
            navigate("/");
          } else {
            Swal.fire({ text: "회원가입이 필요합니다.", icon: "info" });
            navigate("/naverjoin", {
              state: { naverUserInfo: res.data, isMember: false },
            });
          }
        })
        .catch((err) => {
          Swal.fire({ text: "로그인에 실패했습니다.", icon: "error" });
        });
    }
  }, []);

  return <div>로딩...</div>;
};

export default NaverCallback;
