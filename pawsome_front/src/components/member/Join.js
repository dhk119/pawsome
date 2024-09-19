import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Join = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  // 주소 관련
  const postcodeRef = useRef(null);
  const addressRef = useRef(null);
  const detailAddressRef = useRef(null);

  const [member, setMember] = useState({
    memberEmail: "",
    memberPw: "",
    memberName: "",
    memberNickname: "",
    memberAddr1: "", //우편번호
    memberAddr2: "", //주소
    memberAddr3: "", //상세주소
  });

  const changeMember = (e) => {
    const name = e.target.name;
    setMember({ ...member, [name]: e.target.value });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 0 : 아직 입력하지않은 상태, 1 : 정규표현식, 중복체크 모두 통과한 경우
  // 2 : 정규표현식을 만족하지 못한 상태, 3 : 이메일이 중복인경우
  const [emailCheck, setEmailCheck] = useState(0);
  const checkEmail = () => {
    //이메일 유효성 검사
    //1. 정규표현식 검사
    //2. DB 중복체크
    const emailReg = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailReg.test(member.memberEmail)) {
      setEmailCheck(2);
    } else {
      axios
        .get(`${backServer}/member/memberEmail/${member.memberId}/check-email`)
        .then((res) => {
          console.log(res);
          if (res.data === 1) {
            setEmailCheck(3);
          } else if (res.data === 0) {
            setEmailCheck(1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [nicknameCheck, setNicknameCheck] = useState(0);
  const checkNickname = () => {
    const nicknameReg = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
    if (!nicknameReg.test(member.memberNickname)) {
      setNicknameCheck(2);
    } else {
      axios
        .get(
          `${backServer}/member/memberNickname/${member.memberNickname}/check-nickname`
        )
        .then((res) => {
          console.log(res);
          if (res.data === 1) {
            setNicknameCheck(3); //닉네임 중복
          } else if (res.data === 0) {
            setNicknameCheck(1); //정규표현식 통과
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const pwMessage = useRef(null);
  const checkPw = () => {
    pwMessage.current.classList.remove("valid");
    pwMessage.current.classList.remove("invalid");
    if (member.memberPw === memberPwRe) {
      pwMessage.current.innerText = "비밀번호가 일치합니다.";
      pwMessage.current.classList.add("valid");
    } else {
      pwMessage.current.innerText = "비밀번호가 일치하지 않습니다.";
      pwMessage.current.classList.add("invalid");
    }
  };
  const [memberPwRe, setMemberPwRe] = useState("");
  const changeMemberPwRe = (e) => {
    setMemberPwRe(e.target.value);
  };

  const nameMessage = useRef(null);
  const checkName = () => {
    nameMessage.current.classList.remove("valid");
    nameMessage.current.classList.remove("invalid");

    const nameReg = /^[가-힣]{2,10}$/; // 한글 2-10자
    if (nameReg.test(member.memberName)) {
      nameMessage.current.innerText = "이름이 유효합니다.";
      nameMessage.current.classList.add("valid");
    } else {
      nameMessage.current.innerText = "이름을 확인해주세요.(한글 2-10글자)";
      nameMessage.current.classList.add("invalid");
    }
  };

  const join = () => {
    if (
      emailCheck === 1 && // 이메일이 유효하고 중복체크를 통과한 경우
      nicknameCheck === 1 && // 닉네임이 유효하고 중복체크를 통과한 경우
      member.memberPw === memberPwRe && // 비밀번호와 비밀번호 확인이 일치하는지
      /^[가-힣]{2,10}$/.test(member.memberName) && // 이름이 유효한지
      member.memberAddr1 && // 우편번호가 입력되었는지
      member.memberAddr2 && // 주소가 입력되었는지
      member.memberAddr3 // 상세주소가 입력되었는지
    ) {
      axios
        .post(`${backServer}/member`, member)
        .then((res) => {
          console.log(res);
          console.log(member);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        text: "입력 값을 확인하세요.",
        icon: "info",
        confirmButtonColor: "var(--main1)",
      });
    }
  };

  const handlePostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr =
          data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;

        setMember((prevMember) => ({
          ...prevMember,
          memberAddr1: data.zonecode,
          memberAddr2: addr,
        }));

        document.querySelector("input[name='memberAddr3']").focus();
      },
    }).open();
  };

  return (
    <div className="body">
      <div className="join-page">
        <div className="form">
          <form
            className="join-form"
            onSubmit={(e) => {
              e.preventDefault();
              join();
            }}
          >
            <input
              type="text"
              id="memberEmail"
              name="memberEmail"
              value={member.memberEmail}
              onChange={changeMember}
              onBlur={checkEmail}
              placeholder="이메일"
            />
            <p
              className={
                "input-msg" +
                (emailCheck === 0
                  ? ""
                  : emailCheck === 1
                  ? " valid"
                  : " invalid")
              }
            >
              {emailCheck === 0
                ? ""
                : emailCheck === 1
                ? "사용가능한 이메일 입니다."
                : emailCheck === 2
                ? "이메일 양식에 맞지 않습니다."
                : "이미 사용중인 이메일 입니다."}
            </p>

            <input
              type="password"
              name="memberPw"
              value={member.memberPw}
              onChange={changeMember}
              placeholder="비밀번호"
            />

            <input
              type="password"
              id="memberPwRe"
              value={memberPwRe}
              onChange={changeMemberPwRe}
              onBlur={checkPw}
              placeholder="비밀번호 확인"
            />
            <p className="input-msg" ref={pwMessage}></p>

            <input
              type="text"
              id="memberNickname"
              name="memberNickname"
              value={member.memberNickname}
              onChange={changeMember}
              onBlur={checkNickname}
              placeholder="닉네임"
            />
            <p
              className={
                "input-msg" +
                (nicknameCheck === 0
                  ? ""
                  : nicknameCheck === 1
                  ? " valid"
                  : " invalid")
              }
            >
              {nicknameCheck === 0
                ? ""
                : nicknameCheck === 1
                ? "사용가능한 닉네임입니다."
                : nicknameCheck === 2
                ? "닉네임 양식에 맞지 않습니다."
                : "이미 사용중인 닉네임 입니다."}
            </p>

            <input
              type="text"
              id="memberName"
              name="memberName"
              value={member.memberName}
              onChange={changeMember}
              placeholder="이름"
              onBlur={checkName}
            />
            <p className="input-msg" ref={nameMessage}></p>
            <div className="addr">
              <input
                type="text"
                ref={postcodeRef}
                name="memberAddr1"
                value={member.memberAddr1}
                onChange={changeMember}
                placeholder="우편번호"
              />
              <input
                className="addr-btn"
                type="button"
                onClick={handlePostcode}
                value="우편번호 찾기"
              />
            </div>
            <input
              type="text"
              ref={addressRef}
              name="memberAddr2"
              value={member.memberAddr2}
              onChange={changeMember}
              placeholder="주소"
            />

            <input
              type="text"
              name="memberAddr3"
              value={member.memberAddr3}
              onChange={changeMember}
              ref={detailAddressRef}
              placeholder="상세주소"
            />

            <button type="submit">회원가입</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Join;
