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
  const [newMemberPw, setNewMemberPw] = useState(""); // 새 비밀번호
  const [memberPwRe, setMemberPwRe] = useState(""); // 새 비밀번호 확인
  const pwMessage = useRef(null);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  const handleCurrentPwChange = (e) => {
    setMemberPw(e.target.value);
  };

  const changePw = (e) => {
    e.preventDefault();

    axios
      .post(`${backServer}/member/changePw`, {
        memberPw: memberPw,
        newMemberPw: newMemberPw,
      })
      .then((res) => {
        console.log(res.data);
        switch (res.data) {
          case 1:
            Swal.fire(
              "비밀번호 변경 완료",
              "성공적으로 비밀번호를 변경하셨습니다.",
              "success"
            );
            navigate("/mypage/profile");
            break;
          case 2:
            Swal.fire("오류", "현재 비밀번호와 일치하지 않습니다.", "error");
            break;
          default:
            Swal.fire(
              "오류",
              "비밀번호 변경에 실패했습니다. 다시 시도해주세요.",
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
          <form className="login-form" onSubmit={changePw}>
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
