import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { loginEmailState, memberTypeState } from "../utils/RecoilData";

const Login = () => {
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [member, setMember] = useState({ memberEmail: "", memberPw: "" });
  const navigate = useNavigate();
  const changeMember = (e) => {
    const name = e.target.name;
    setMember({ ...member, [name]: e.target.value });
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
        setLoginEmail(res.data.memberEmail);
        setMemberType(res.data.memberType);
        //로그인 이후 axios 요청 시 발급받은 토큰값을 자동으로 axios에 추가하는 설정
        axios.defaults.headers.common["Authorization"] = res.data.accessToken;
        //로그인 상태를 지속적으로 유지시키기위해 발급받은 refreshToken을 브라우저에 저장
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
    <section>
      <div>로그인</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <div>
          <label>이메일</label>
          <div>
            <input
              type="text"
              name="memberEmail"
              id="memberEmail"
              value={member.memberEmail}
              onChange={changeMember}
            />
          </div>
        </div>
        <div>
          <label>비밀번호</label>
          <div>
            <input
              type="password"
              name="memberPw"
              id="memberPw"
              value={member.memberPw}
              onChange={changeMember}
            />
          </div>
        </div>
        <button type="submit">
            로그인
        </button>
      </form>
    </section>
  );
};

export default Login;
