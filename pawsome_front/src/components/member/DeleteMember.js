import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { loginEmailState } from "../utils/RecoilData";
import "./member.css";

const DeleteMember = () => {
  const [loginEmail] = useRecoilState(loginEmailState); // 로그인 이메일 값 사용
  const [memberPw, setMemberPw] = useState(""); // 현재 비밀번호
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  const handleCurrentPwChange = (e) => {
    setMemberPw(e.target.value);
  };

  const deleteMember = () => {
    axios
      .delete(`${backServer}/member/memberEmail/${loginEmail}`)
      .then((res) => {
        console.log(res.data);
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
