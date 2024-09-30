import { useRecoilState } from "recoil";
import {
  loginEmailState,
  memberLevelState,
  memberNicknameState,
} from "../utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";

const MypageProfile = () => {
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const backServer = process.env.REACT_APP_BACK_SERVER;

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
  }, [loginEmail]);

  return (
    <>
      <div className="profile-wrap">
        <h2>프로필</h2>
        <div className="profile-img">
          <img src={`${backServer}/member/profile/${member.memberProfile}`} />
        </div>
        <div className="member-name">{member.memberName}</div>
        <div>{member.memberEmail}</div>
        <div className="member-addr">
          <div>{member.memberAddr2}</div>
          <div>{member.memberAddr3}</div>
        </div>
        <div className="profile-btn-wrap">
          <button>회원정보 수정</button>
          <Link to="/mypage/updateMember">회원정보 수정</Link>
        </div>
      </div>
      <div className="pet-wrap">
        <h2>반려동물</h2>

        {petList.length > 0 ? (
          petList.map((pet, index) => (
            <div className="pet-body" key={index}>
              <div className="pet-img">
                <img src={`${backServer}/member/pet/${pet.petProfile}`} />
              </div>
              <div className="pet-info">
                <div className="pet-name">{pet.petName}</div>
                <div>{pet.petBreed}</div>
              </div>
              <div className="pet-more-view">
                <SlArrowRight />
              </div>
            </div>
          ))
        ) : (
          <div className="pet-body">등록된 반려동물이 없습니다.</div>
        )}
        <div className="pet-btn-wrap">
          <button>반려동물 편집</button>
        </div>
      </div>
    </>
  );
};
export default MypageProfile;
