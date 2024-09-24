import { useRecoilState } from "recoil";
import {
  loginEmailState,
  memberLevelState,
  memberNicknameState,
} from "../utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";

const MypageProfile = () => {
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [member, setMember] = useState(null);

  useEffect(() => {
    axios
      .post(`${backServer}/member/profile`)
      .then((res) => {
        console.log(res);
        setMember(res.data);
        console.log(res.data);
        console.log(member);
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
          <img />
        </div>
        {/* <div>{member.memberName}</div>
        <div>{member.memberEmail}</div>
        <div className="member-addr">
          <div>{member.memberAddr2}</div>
          <div>{member.memberAddr3}</div>
        </div> */}
        <div className="profile-btn-wrap">
          <button>변경하기</button>
        </div>
      </div>
      <div className="pet-wrap"></div>
    </>
  );
};
export default MypageProfile;
