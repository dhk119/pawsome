import axios from "axios";
import "./member.css";
import { useEffect, useState } from "react";
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
  const [timer, setTimer] = useState(180); // 3분 타이머

  useEffect(() => {
    let countdown;
    if (showCodeInput && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [showCodeInput, timer]);

  useEffect(() => {
    if (timer === 0) {
      Swal.fire({
        text: "인증 시간이 초과되었습니다.",
        icon: "error",
      });
      setShowCodeInput(false);
      setAuthCode(""); // 인증코드 초기화
      setInsertCode(""); // 인증코드 입력란 초기화
      setTimer(180); // 타이머 초기화
    }
  }, [timer]);

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

  const rePassword = () => {
    if (authCode === insertCode) {
      // 인증번호가 일치하는 경우
      axios
        .post(`${backServer}/member/changePassword`, member)
        .then((res) => {
          Swal.fire({
            text: "새 비밀번호가 이메일로 전송되었습니다.",
            icon: "success",
          });
          setTimeout(() => {
            window.location.href = "/login"; // 로그인 페이지로 이동
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            text: "비밀번호 변경에 실패했습니다.",
            icon: "error",
          });
        });
    } else {
      // 인증번호가 일치하지 않는 경우
      Swal.fire({
        text: "인증번호가 일치하지 않습니다.",
        icon: "error",
      });
    }
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
                <div>
                  남은 시간: {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, "0")}
                </div>
                <button type="button" onClick={rePassword}>
                  인증하기
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPw;
