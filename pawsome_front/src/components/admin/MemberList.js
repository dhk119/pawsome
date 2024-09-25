import axios from "axios";
import { useEffect, useState } from "react";
import PageNavi from "../utils/PageNavi";
import { MenuItem, Select } from "@mui/material";

const MemberList = () => {
  const [memberList, setMemberList] = useState([]);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  useEffect(() => {
    axios.get(`${backServer}/admin/memberList/${reqPage}`).then((res) => {
      setMemberList(res.data.list);
      setPi(res.data.pi);
    });
  }, [reqPage]);
  const changeLevel = (i, memberLevel) => {
    memberList[i].memberLevel = memberLevel;
    setMemberList([...memberList]);
  };
  return (
    <section>
      <div className="admin-title">회원 리스트</div>
      <table className="admin-tbl">
        <thead>
          <tr>
            <th>화원 이메일</th>
            <th>회원 닉네임</th>
            <th>회원명</th>
            <th>우편번호</th>
            <th>주소</th>
            <th>상세주소</th>
            <th>등급</th>
            <th>멤버 프로필 사진</th>
            <th>회원 가입일</th>
            <th>로그인 타입</th>
            <th>전화번호</th>
          </tr>
        </thead>
        <tbody>
          {memberList.map((member, i) => {
            const handleChange = () => {
              const memberLevel = member.memberLevel === 2 ? 1 : 2;
              const obj = {
                memberEmail: member.memberEmail,
                memberLevel: memberLevel,
              };
              axios
                .patch(`${backServer}/admin/member`, obj)
                .then((res) => {
                  changeLevel(i);
                })
                .catch(() => {});
              changeLevel(i, memberLevel);
            };
            return (
              <tr key={"member" + i}>
                <td>{member.memberEmail}</td>
                <td>{member.memberNickname}</td>
                <td>{member.memberName}</td>
                <td>{member.memberAddr1}</td>
                <td>{member.memberAddr2}</td>
                <td>{member.memberAddr3}</td>
                <td>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={member.memberLevel}
                    label="level"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>관리자</MenuItem>
                    <MenuItem value={2}>일반회원</MenuItem>
                  </Select>
                </td>
                <td>
                  <img
                    src={`${backServer}/member/profile/${member.menberProfile}`}
                    style={{ width: "100%", height: "100%" }}
                  ></img>
                </td>
                <td>{member.enrollDate}</td>
                <td>{member.loginType}</td>
                <td>{member.memberPhone}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pageNavi-frm">
        <ul className="pageNavi-ul">
          <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
        </ul>
      </div>
    </section>
  );
};
export default MemberList;
