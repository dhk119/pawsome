import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    axios
      .get(
        `${backServer}/member/memberNickname/${member.memberNickname}/check-nicknmae`
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

  const join = () => {
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
              name="memberNickname"
              value={member.memberNickname}
              onChange={changeMember}
              onBlur={checkNickname}
              placeholder="닉네임"
            />

            <input
              type="text"
              name="memberName"
              value={member.memberName}
              onChange={changeMember}
              placeholder="이름"
            />
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
