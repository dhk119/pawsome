import { useRecoilState } from "recoil";
import {
  loginEmailState,
  memberLevelState,
  memberNicknameState,
} from "../utils/RecoilData";
import { useEffect } from "react";
import axios from "axios";

const MypageProfile = () => {
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const backServer = process.env.REACT_APP_BACK_SERVER;

  useEffect(() => {
    axios
      .post(`${backServer}/member/profile/${loginEmail}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <div className="profile-wrap">
        <div></div>
        <div>{memberNickname}</div>
      </div>
      <div className="pet-wrap"></div>
    </>
  );
};
export default MypageProfile;
