import axios from "axios";
import "./member.css";
import { useState } from "react";
import Swal from "sweetalert2";

const ForgotPw = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [member, setMember] = useState({
    memberEmail: "",
    memberName: "",
  });

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [authCode, setAuthCode] = useState(""); //인증코드 저장
  const [insertCode, setInsertCode] = useState("");

  const sendMailCode = () => {
    console.log(member);
    axios
      .post(`${backServer}/member/sendMailCode`, member)
      .then((res) => {
        console.log(res.data);
        if (res.data == "") {
          Swal.fire({
            text: "소셜 로그인으로 가입된 이메일입니다.",
            icon: "error",
          });
        } else if (res.data == "no") {
          Swal.fire({
            text: "계정을 찾을 수 없습니다.",
            icon: "error",
          });
        } else {
          Swal.fire({
            text: "인증메일이 전송되었습니다.",
            icon: "success",
          });
          setShowCodeInput(true);
          setAuthCode(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ForgotInputChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  return (
    <div className="body">
      <div className="login-page">
        <div className="form">
          <h2>비밀번호 찾기</h2>
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              name="memberEmail"
              id="memberEmail"
              placeholder="이메일"
              value={member.memberEmail}
              onChange={ForgotInputChange}
            />
            <input
              type="text"
              name="memberName"
              id="memberName"
              placeholder="이름"
              value={member.memberName}
              onChange={ForgotInputChange}
            />
            <button type="button" onClick={sendMailCode}>
              인증번호 전송
            </button>

            {showCodeInput && (
              <>
                <input
                  type="text"
                  name="authCode"
                  id="authCode"
                  placeholder="인증번호 입력"
                  value={insertCode}
                  onChange={(e) => setInsertCode(e.target.value)}
                />
                <button type="button">인증하기</button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPw;
