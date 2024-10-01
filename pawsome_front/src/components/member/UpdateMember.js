import { Link, useNavigate } from "react-router-dom";
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
    loginType: "",
  });

  const changeMember = (e) => {
    const name = e.target.name;
    setMember({ ...member, [name]: e.target.value });
  };

  const memberImgRef = useRef(null);
  const [memberImgPreview, setMemberImgPreview] = useState("member_img.png");
  const [initialProfile, setInitialProfile] = useState(null);

  // 회원 정보 불러오기
  useEffect(() => {
    axios
      .post(`${backServer}/member/profile`)
      .then((res) => {
        setMember(res.data);
        setMemberImgPreview(res.data.memberProfile || "member_img.png");
        setInitialProfile(res.data.memberProfile); // 초기 프로필 이미지를 저장
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
  const update = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("memberEmail", member.memberEmail);
    form.append("memberName", member.memberName);
    form.append("memberNickname", member.memberNickname);
    form.append("memberAddr1", member.memberAddr1);
    form.append("memberAddr2", member.memberAddr2);
    form.append("memberAddr3", member.memberAddr3);
    if (member.memberPhone !== null) {
      form.append("memberPhone", member.memberPhone);
    }

    // 프로필 사진 전송 (변경된 경우에만)
    if (
      member.memberProfile !== null &&
      member.memberProfile !== initialProfile
    ) {
      form.append("memberProfile1", member.memberProfile);
    }

    // FormData 디버깅 출력
    console.log("=== FormData 내용 ===");
    for (let pair of form.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    axios
      .patch(`${backServer}/member`, form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
        },
      })
      .then((res) => {
        if (res.data) {
          navigate("/mypage/profile");
        } else {
          Swal.fire({
            title: "에러가 발생했습니다.",
            text: "다시 시도해주세요.",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          <form className="member-form" onSubmit={update}>
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
              <button
                type="button"
                className="resetProfileImage"
                onClick={resetProfileImage}
              >
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

            {member.loginType == "site" ? (
              <>
                <Link to="/mypage/change-pw" className="changePw">
                  비밀번호 변경
                </Link>
              </>
            ) : (
              <></>
            )}

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

            <button type="submit" className="submit">
              회원 정보 수정
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMember;
