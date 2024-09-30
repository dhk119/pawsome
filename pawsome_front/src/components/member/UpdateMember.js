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
    memberAddr1: "", // 우편번호
    memberAddr2: "", // 주소
    memberAddr3: "", // 상세주소
    memberPhone: "", // 전화번호
    memberProfile: null, // 프로필 사진
    loginType: "", // 로그인 타입
  });

  const changeMember = (e) => {
    const name = e.target.name;
    setMember({ ...member, [name]: e.target.value });
  };

  const memberImgRef = useRef(null);
  const [memberImgPreview, setMemberImgPreview] = useState("member_img.png");

  // 회원 정보 불러오기
  useEffect(() => {
    axios
      .post(`${backServer}/member/profile`)
      .then((res) => {
        setMember(res.data);
        setMemberImgPreview(res.data.memberProfile || "member_img.png");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backServer]);

  // Daum 우편번호 API 스크립트 추가
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

  // 회원 정보 수정 요청
  const update = () => {
    const formData = new FormData();
    formData.append("memberEmail", member.memberEmail);
    formData.append("memberName", member.memberName);
    formData.append("memberNickname", member.memberNickname);
    formData.append("memberAddr1", member.memberAddr1);
    formData.append("memberAddr2", member.memberAddr2);
    formData.append("memberAddr3", member.memberAddr3);
    formData.append("memberPhone", member.memberPhone);

    // 프로필 사진 전송
    if (member.memberProfile !== null) {
      formData.append("memberProfile1", member.memberProfile);
    }

    if (
      member.memberNickname &&
      member.memberName &&
      member.memberAddr1 &&
      member.memberAddr2
    ) {
      axios
        .patch(`${backServer}/member`, formData, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          console.log(res);
          navigate("/mypage/profile");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        text: "필수 항목을 모두 입력해주세요.",
        icon: "warning",
      });
    }
  };

  // 사진 미리보기 설정
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMember((prevMember) => ({
        ...prevMember,
        memberProfile: file,
      }));

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setMemberImgPreview(reader.result);
      };
    } else {
      setMemberImgPreview("member_img.png");
    }
  };

  // 기본 이미지로 변경
  const resetProfileImage = () => {
    setMemberImgPreview("member_img.png");
    setMember((prevMember) => ({
      ...prevMember,
      memberProfile: null,
    }));
  };

  // Daum 우편번호 찾기 API 사용
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
      <div className="member-page">
        <div className="form">
          <h2>회원 정보 수정</h2>
          <form
            className="join-form"
            onSubmit={(e) => {
              e.preventDefault();
              update();
            }}
          >
            <div className="image-upload">
              <img
                alt="회원 이미지 미리보기"
                src={
                  memberImgPreview.startsWith("data")
                    ? memberImgPreview
                    : `${backServer}/member/profile/${memberImgPreview}`
                }
                className="member-image"
                onClick={() => memberImgRef.current.click()}
              />
              <label>
                <input
                  ref={memberImgRef}
                  type="file"
                  accept="image/*"
                  name="memberProfile"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>
              <button type="button" onClick={resetProfileImage}>
                기본 이미지로 변경
              </button>
            </div>

            <input
              type="text"
              id="memberEmail"
              name="memberEmail"
              value={member.memberEmail}
              placeholder="이메일"
              disabled
            />

            <button>비밀번호 변경</button>

            <input
              type="text"
              id="memberNickname"
              name="memberNickname"
              value={member.memberNickname || ""}
              onChange={changeMember}
              placeholder="닉네임"
            />

            <input
              type="text"
              id="memberName"
              name="memberName"
              value={member.memberName || ""}
              onChange={changeMember}
              placeholder="이름"
            />

            <input
              type="text"
              id="memberPhone"
              name="memberPhone"
              value={member.memberPhone || ""}
              onChange={changeMember}
              placeholder="전화번호(-제외, 선택사항)"
            />

            <div className="addr">
              <input
                type="text"
                ref={postcodeRef}
                name="memberAddr1"
                value={member.memberAddr1 || ""}
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
              value={member.memberAddr2 || ""}
              onChange={changeMember}
              placeholder="주소"
            />

            <input
              type="text"
              name="memberAddr3"
              value={member.memberAddr3 || ""}
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
