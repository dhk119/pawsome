import { useRecoilState } from "recoil";
import {
  loginEmailState,
  memberLevelState,
  memberNicknameState,
} from "../utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";
import { SlArrowRight } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import HealthTestRecord from "../service/HealthTestRecord";

const MypageProfile = () => {
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [member, setMember] = useState({});
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    axios
      .post(`${backServer}/member/profile`)
      .then((res) => {
        console.log(res);
        setMember(res.data);
        console.log(res.data.petList);
        if (res.data.petList != null) {
          setPetList(res.data.petList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginEmail, backServer, memberLevel, memberNickname]);

  // 생년월일을 'n년 n개월' 형식으로 변환하는 함수
  const getPetAge = (birthDate) => {
    const birth = new Date(birthDate); // 반려동물의 생일을 Date 객체로 변환
    const now = new Date(); // 현재 날짜를 가져오기

    let years = now.getFullYear() - birth.getFullYear(); // 년도 차이 계산
    let months = now.getMonth() - birth.getMonth(); // 월 차이 계산

    // 만약 월 차이가 음수라면, 1년을 빼고 개월을 12 더해서 조정
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return `${years}년 ${months}개월`;
  };

  return (
    <>
      <div className="profile-wrap">
        <h2>프로필</h2>
        <div className="profile-img">
          <img
            src={`${backServer}/member/profile/${member.memberProfile}`}
            alt="profile"
          />
        </div>
        <div className="member-name">{member.memberName}</div>
        <div className="email-wrap">
          <div>{member.memberEmail}</div>
          <div>
            {member.loginType === "kakao" ? (
              <img src="/image/kakao_btn.png" />
            ) : member.loginType === "naver" ? (
              <img src="/image/naver_btn.png" />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="member-addr">
          <div>{member.memberAddr2}</div>
          <div>{member.memberAddr3}</div>
        </div>
        <div className="profile-btn-wrap">
          <Link to="/mypage/updateMember">회원정보 수정</Link>
        </div>
      </div>
      <div className="pet-wrap">
        <h2>반려동물</h2>
        {petList.length > 0 ? (
          petList.map((pet, index) => (
            <>
              <div
                className="pet-body"
                key={index}
                onClick={() => navigate(`/mypage/pet-view/${pet.petNo}`)} // 클릭 시 상세보기 페이지로 이동
              >
                <div className="pet-img">
                  <img
                    src={`${backServer}/member/pet/${pet.petProfile}`}
                    alt="pet-profile"
                  />
                </div>
                <div className="pet-info">
                  <div className="pet-name">{pet.petName}</div>
                  <div>{pet.petBreed}</div>
                  <div>{getPetAge(pet.petBirth)}</div>{" "}
                </div>
                <div className="pet-more-view">
                  <SlArrowRight />
                </div>
              </div>
            </>
          ))
        ) : (
          <div className="pet-body" onClick={() => navigate("/petinsert")}>
            등록된 반려동물이 없습니다.
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <HealthTestRecord />
          </div>
          <div className="pet-btn-wrap">
            <Link to="/petinsert">반려동물 등록</Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default MypageProfile;
