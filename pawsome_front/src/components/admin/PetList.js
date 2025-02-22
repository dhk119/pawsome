import { useEffect, useState } from "react";
import PageNavi from "../utils/PageNavi";
import axios from "axios";
import { memberLevelState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
import Interceptor from "./Interceptor";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PetList = () => {
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [petList, setPetList] = useState([]);
  const [type, setType] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [option, setOption] = useState(0);
  const [search, setSearch] = useState(0);
  const navigate = useNavigate();
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  useEffect(() => {
    memberLevel === 1
      ? search === 0
        ? axios.get(`${backServer}/admin/petList/${reqPage}`).then((res) => {
            setPetList(res.data.list);
            setPi(res.data.pi);
          })
        : keyword
        ? axios
            .get(
              `${backServer}/admin/searchPet/${reqPage}/${type}/${keyword}/${option}`
            )
            .then((res) => {
              setPetList(res.data.list);
              setPi(res.data.pi);
            })
        : axios
            .get(`${backServer}/admin/searchPet/${reqPage}/${option}`)
            .then((res) => {
              setPetList(res.data.list);
              setPi(res.data.pi);
            })
      : Swal.fire({
          text: "접근 권한이 없습니다",
          icon: "info",
          iconColor: "#ffa518",
          confirmButtonColor: "#ffa518",
        });
  }, [reqPage, search]);
  const changeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const changeType = (e) => {
    setType(e.target.value);
  };
  const searchPet = () => {
    if (!keyword && option === 0) {
      setSearch(0);
    } else {
      setSearch(search + 1);
      setReqPage(1);
    }
  };
  const changeOption = (e) => {
    setOption(Number(e.target.value));
  };
  return (
    <section>
      {memberLevel === 1 ? (
        <div>
          <div className="admin-title">펫 리스트</div>
          <div className="admin-write-wrap">
            <div className="admin-top-left"></div>
            <div className="admin-top-mid"></div>
            <div className="admin-search-wrap">
              <div className="inquiry-keyword">
                <label htmlFor="option"></label>
                <select id="option" value={option} onChange={changeOption}>
                  <option value={0}>전체</option>
                  <option value={1}>강아지</option>
                  <option value={2}>고양이</option>
                </select>
                <label htmlFor="type"></label>
                <select id="type" value={type} onChange={changeType}>
                  <option value={"all"}>전체</option>
                  <option value={"name"}>이름</option>
                  <option value={"breed"}>품종</option>
                  <option value={"memberEmail"}>멤버 이메일</option>
                </select>
              </div>
              <div className="search-input-wrap" id="inquiry-search">
                <button
                  type="button"
                  className="search-btn"
                  onClick={searchPet}
                >
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
                <th>펫 번호</th>
                <th>이름</th>
                <th>종</th>
                <th>품종</th>
                <th>생년월일</th>
                <th>성별</th>
                <th>중성화 여부</th>
                <th>반려동물 프로필 사진</th>
                <th>몸무게</th>
                <th>멤버 이메일</th>
              </tr>
            </thead>
            <tbody id="admin-member-list-body">
              {petList.map((pet, i) => {
                return (
                  <tr key={"pet" + i}>
                    <td>{pet.petNo}</td>
                    <td>{pet.petName}</td>
                    {pet.petClasses === 1 ? <td>강아지</td> : <td>고양이</td>}
                    <td>{pet.petBreed}</td>
                    <td>{pet.petBirth}</td>
                    <td>{pet.petGender}</td>
                    {pet.neutering === 1 ? <td>o</td> : <td>x</td>}
                    <td>
                      <img
                        src={`${backServer}/member/pet/${pet.petProfile}`}
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </td>
                    <td>{pet.petWeight}</td>
                    <td>{pet.memberEmail}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pageNavi-frm admin-list">
            <ul className="pageNavi-ul">
              <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
            </ul>
          </div>
          <div className="admin-list-button-zone">
            <button
              className="admin-write-submit"
              type="button"
              onClick={() => {
                navigate("/admin/main");
              }}
            >
              관리자 페이지
            </button>
          </div>
        </div>
      ) : (
        <Interceptor />
      )}
    </section>
  );
};
export default PetList;
