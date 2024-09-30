import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateMember = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  // 주소 관련
  const postcodeRef = useRef(null);
  const addressRef = useRef(null);
  const detailAddressRef = useRef(null);

  const [member, setMember] = useState({
    memberEmail: "", // 회원 이메일
    memberName: "",
    memberNickname: "",
    memberAddr1: "", //우편번호
    memberAddr2: "", //주소
    memberAddr3: "", //상세주소
    loginType: "", // 로그인 타입
  });

  const changeMember = (e) => {
    const name = e.target.name;
    setMember({ ...member, [name]: e.target.value });
  };

  // 회원 정보 불러오기
  useEffect(() => {
    axios
      .get(`${backServer}/member/me`) // 자신의 정보를 가져오는 API 경로
      .then((res) => {
        setMember(res.data); // 받아온 데이터를 state에 저장
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const update = () => {
    axios
      .put(`${backServer}/member`, member) // 회원 수정 API
      .then((res) => {
        console.log(res);
        Swal.fire({
          text: "회원 정보가 수정되었습니다.",
          icon: "success",
        });
        navigate("/mypage"); // 회원 정보 수정 후 이동할 페이지
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
          <h2>회원 정보 수정</h2>
          <form
            className="join-form"
            onSubmit={(e) => {
              e.preventDefault();
              update();
            }}
          >
            <input
              type="text"
              id="memberEmail"
              name="memberEmail"
              value={member.memberEmail}
              placeholder="이메일"
              disabled // 이메일 수정 불가
            />

            <input
              type="text"
              id="memberNickname"
              name="memberNickname"
              value={member.memberNickname}
              onChange={changeMember}
              placeholder="닉네임"
              disabled // 닉네임 수정 가능 여부에 따라 disabled 처리
            />

            <input
              type="text"
              id="memberName"
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

            <button type="submit">회원 정보 수정</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMember;
