import axios from "axios";
import { useEffect, useState } from "react";
import PageNavi from "../utils/PageNavi";
import { MenuItem, Select } from "@mui/material";

const MemberList = () => {
  const [memberList, setMemberList] = useState([]);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [type, setType] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [option, setOption] = useState(0);
  const [search, setSearch] = useState(0);
  useEffect(() => {
    search === 0
      ? axios.get(`${backServer}/admin/memberList/${reqPage}`).then((res) => {
          setMemberList(res.data.list);
          setPi(res.data.pi);
        })
      : keyword
      ? axios
          .get(
            `${backServer}/admin/searchMember/${reqPage}/${type}/${keyword}/${option}`
          )
          .then((res) => {
            setMemberList(res.data.list);
            setPi(res.data.pi);
          })
      : axios
          .get(`${backServer}/admin/searchMember/${reqPage}/${option}`)
          .then((res) => {
            setMemberList(res.data.list);
            setPi(res.data.pi);
          });
  }, [reqPage, search]);
  const changeLevel = (i, memberLevel) => {
    memberList[i].memberLevel = memberLevel;
    setMemberList([...memberList]);
  };
  const changeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const changeType = (e) => {
    setType(e.target.value);
  };
  const searchMember = () => {
    if (!keyword && option === 0) {
      setSearch(0);
    } else {
      setSearch(search + 1);
    }
  };
  const changeOption = (e) => {
    setOption(Number(e.target.value));
  };
  return (
    <section>
      <div className="admin-title">회원 리스트</div>
      <div className="admin-write-wrap">
        <div className="admin-top-left"></div>
        <div className="admin-top-mid"></div>
        <div className="admin-search-wrap">
          <div className="inquiry-keyword">
            <label htmlFor="option"></label>
            <select id="option" value={option} onChange={changeOption}>
              <option value={0}>전체</option>
              <option value={1}>관리자</option>
              <option value={2}>일반회원</option>
            </select>
            <label htmlFor="type"></label>
            <select id="type" value={type} onChange={changeType}>
              <option value={"all"}>전체</option>
              <option value={"memberEmail"}>회원 이메일</option>
              <option value={"nickname"}>닉네임</option>
              <option value={"name"}> 회원명 </option>
              <option value={"addrNum"}>우편번호</option>
              <option value={"address"}>주소</option>
              <option value={"loginType"}> 로그인 타입 </option>
              <option value={"phone"}> 전화번호 </option>
            </select>
          </div>
          <div className="search-input-wrap" id="inquiry-search">
            <button type="button" className="search-btn" onClick={searchMember}>
              <img src="/image/paw.png" className="search-icon" />
            </button>
            <input
              type="text"
              className="search-input"
              placeholder="검색어를 입력하세요"
              value={keyword}
              onChange={changeKeyword}
            ></input>
          </div>
        </div>
      </div>
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
        <tbody id="admin-member-list-body">
          {memberList.map((member, i) => {
            const handleChange = (e) => {
              const memberLevel = e.target.value;
              const obj = {
                memberEmail: member.memberEmail,
                memberLevel: memberLevel,
              };
              axios
                .patch(`${backServer}/admin/member`, obj)
                .then((res) => {
                  changeLevel(i, memberLevel);
                })
                .catch(() => {});
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
                    value={member.memberLevel}
                    onChange={handleChange}
                    className="admin-select-color"
                    id="admin-member-select"
                  >
                    <MenuItem value={1} id="admin-member-menu1">
                      관리자
                    </MenuItem>
                    <MenuItem value={2} id="admin-member-menu2">
                      일반회원
                    </MenuItem>
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
