import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { loginEmailState, memberLevelState, memberNicknameState } from "../utils/RecoilData";
import "./member.css";

const DeleteMember = () => {
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState); // 로그인 이메일 값 사용
  const [memberPw, setMemberPw] = useState(""); // 현재 비밀번호
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  const handleCurrentPwChange = (e) => {
    setMemberPw(e.target.value);
  };

  const deleteMember = (e) => {
    e.preventDefault();
  
    axios
      .delete(`${backServer}/member/memberEmail/${loginEmail}`, {
        params: { memberPw: memberPw },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data == 1) {
          setLoginEmail("");
          setMemberLevel(0);
          setMemberNickname("");

          delete axios.defaults.headers.common["Authorization"];
          window.localStorage.removeItem("refreshToken");
          Swal.fire(
            "회원 탈퇴 완료",
            "성공적으로 회원을 탈퇴하셨습니다.",
            "success"
          );
          navigate("/");
        } else if (res.data == 2) {
          Swal.fire(
            "비밀번호가 옳지 않습니다.",
            "현재 비밀번호와 같지 않습니다.",
            "error"
          );
        } else {
          Swal.fire(
            "비밀번호 변경 실패",
            "잠시 후 다시 시도해주세요.",
            "error"
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  

  return (
    <div className="body">
      <div className="login-page">
        <div className="form">
          <h2>회원 탈퇴</h2>
          <form className="login-form" onSubmit={deleteMember}>
            <input
              type="password"
              name="memberPw"
              id="memberPw"
              value={memberPw}
              onChange={handleCurrentPwChange}
              placeholder="현재 비밀번호"
              required
            />

            <button className="submit" type="submit">
              회원 탈퇴
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteMember;
