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
    <div>
      <div>회원가입</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          join();
        }}
      >
        <div>
          <input
            type="text"
            id="memberEmail"
            name="memberEmail"
            value={member.memberEmail}
            onChange={changeMember}
            placeholder="이메일"
          />
        </div>
        <div>
          <input
            type="password"
            name="memberPw"
            value={member.memberPw}
            onChange={changeMember}
            placeholder="비밀번호"
          />
        </div>
        <div>
          <input type="password" placeholder="비밀번호 확인" />
        </div>
        <div>
          <input
            type="text"
            name="memberNickname"
            value={member.memberNickname}
            onChange={changeMember}
            placeholder="닉네임"
          />
        </div>
        <div>
          <input
            type="text"
            name="memberName"
            value={member.memberName}
            onChange={changeMember}
            placeholder="이름"
          />
        </div>
        <div>
          <input
            type="text"
            ref={postcodeRef}
            name="memberAddr1"
            value={member.memberAddr1}
            onChange={changeMember}
            placeholder="우편번호"
          />
          <input type="button" onClick={handlePostcode} value="우편번호 찾기" />
        </div>
        <div>
          <input
            type="text"
            ref={addressRef}
            name="memberAddr2"
            value={member.memberAddr2}
            onChange={changeMember}
            placeholder="주소"
          />
        </div>
        <div>
          <input
            type="text"
            name="memberAddr3"
            value={member.memberAddr3}
            onChange={changeMember}
            ref={detailAddressRef}
            placeholder="상세주소"
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Join;
