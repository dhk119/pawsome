import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginState } from "../utils/RecoilData";
import PageNavi from "../utils/PageNavi";

const InquiryList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [inquiryList, setInquiryList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const isLogin = useRecoilValue(isLoginState);
  const [type, setType] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(false);
  const [option, setOption] = useState(0);
  const [searchFrm, setSerachFrm] = useState({
    reqPage: 1,
    type: "all",
    keyword: "",
    option: 0,
  });
  useEffect(() => {
    const form = new FormData();
    form.append("reqPage", reqPage);
    form.append("type", type);
    form.append("keyword", keyword);
    form.append("option", option);
    {
      !search
        ? axios
            .get(`${backServer}/inquiry/list/${reqPage}`)
            .then((res) => {
              setInquiryList(res.data.list);
              setPi(res.data.pi);
            })
            .catch(() => {})
        : axios
            .get(`${backServer}/inquiry/search`, form)
            .then((res) => {
              setInquiryList(res.data.list);
              setPi(res.data.pi);
            })
            .catch(() => {});
    }
  }, [reqPage, search]);
  const changeKeyword = (e) => {
    setKeyword(e.target.value);
    setSerachFrm({ ...searchFrm, keyword: e.target.value });
  };
  const changeType = (e) => {
    setType(e.target.value);
    setSerachFrm({ ...searchFrm, type: e.target.value });
  };
  const searchInquiry = () => {
    setSerachFrm({ ...searchFrm, reqPage: 1 });
    setSearch(false);
    if (keyword === "" && type === "all" && option === 0) {
    } else {
      setSearch(true);
    }
  };
  const changeOption = (e) => {
    setOption(Number(e.target.value));
    setSerachFrm({ ...searchFrm, option: Number(e.target.value) });
  };
  return (
    <section className="section inquiry-list">
      <div className="admin-title">문의사항</div>
      <div className="admin-write-wrap">
        {isLogin ? (
          <div className="admin-top-left">
            <div className="admin-write">
              <Link to="/inquiry/write">글쓰기</Link>
            </div>
          </div>
        ) : (
          <div className="admin-top-left"></div>
        )}
        <div className="admin-top-mid"></div>
        <div className="admin-search-wrap">
          <div className="inquiry-keyword">
            <label htmlFor="option"></label>
            <select id="option" value={option} onChange={changeOption}>
              <option value={0}>전체</option>
              <option value={1}>계정관련</option>
              <option value={2}>게시판관련</option>
              <option value={3}>기타</option>
            </select>
            <label htmlFor="type"></label>
            <select id="type" value={type} onChange={changeType}>
              <option value={"all"}>전체</option>
              <option value={"title"}>제목</option>
              <option value={"writer"}>작성자</option>
              <option value={"titleContent"}>제목 및 내용</option>
              <option value={"content"}>내용</option>
            </select>
          </div>
          <div className="search-input-wrap" id="inquiry-search">
            <button
              type="button"
              className="search-btn"
              onClick={searchInquiry}
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
            <th>문의번호</th>
            <th>문의사항 제목</th>
            <th>문의시간</th>
            <th>문의타입</th>
            <th>문의자 이메일</th>
          </tr>
        </thead>
        <tbody>
          {inquiryList.map((inquiry, i) => {
            return (
              <tr
                key={"inquiry" + i}
                onClick={() => {
                  navigate(`/inquiry/view/${inquiry.inquiryNo}`);
                }}
              >
                <td>{inquiry.inquiryNo}</td>
                <td>{inquiry.inquiryTitle}</td>
                <td>{inquiry.inquiryRegDate}</td>
                {inquiry.inquiryType === 1 ? (
                  <td>계정 관련</td>
                ) : inquiry.inquiryType === 2 ? (
                  <td>게시판 관련</td>
                ) : inquiry.inquiryType === 3 ? (
                  <td>기타</td>
                ) : (
                  ""
                )}
                <td>{inquiry.memberEmail}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pageNavi-frm">
        <ul className="pageNavi-ul" id="inquiry-page">
          <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
        </ul>
      </div>
    </section>
  );
};
export default InquiryList;
