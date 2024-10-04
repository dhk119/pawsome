import axios from "axios";
import { useEffect, useState } from "react";
import PageNavi from "../utils/PageNavi";
import { useNavigate } from "react-router-dom";

const Qna = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [qnaList, setQnaList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [innerComment, setInnerComment] = useState("댓글 작성 Q&A로 전환");
  const [answer, setAnswer] = useState(false);
  const [type, setType] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [option, setOption] = useState(0);
  const [search, setSearch] = useState(0);
  useEffect(() => {
    search === 0
      ? axios
          .get(`${backServer}/admin/qnaList/${reqPage}/${answer}`)
          .then((res) => {
            setQnaList(res.data.list);
            setPi(res.data.pi);
          })
      : keyword
      ? axios
          .get(
            `${backServer}/admin/searchQna/${reqPage}/${answer}/${type}/${keyword}/${option}`
          )
          .then((res) => {
            setQnaList(res.data.list);
            setPi(res.data.pi);
          })
      : axios
          .get(`${backServer}/admin/searchQna/${reqPage}/${answer}/${option}`)
          .then((res) => {
            setQnaList(res.data.list);
            setPi(res.data.pi);
          });
  }, [reqPage, answer, search]);
  const switchAnswer = () => {
    setAnswer(answer === true ? false : true);
    setInnerComment(
      innerComment === "댓글 작성 Q&A로 전환"
        ? "댓글 미작성 Q&A로 전환"
        : "댓글 작성 Q&A로 전환"
    );
  };
  const changeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const changeType = (e) => {
    setType(e.target.value);
  };
  const searchQna = () => {
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
      <div className="admin-title">qna 리스트</div>
      <div className="admin-write-wrap" id="admin-qna-button-outside">
        <div className="admin-top-left-qna" id="admin-qna-button-wrap">
          <button
            type="button"
            className="search-btn"
            id="admin-qna-button"
            onClick={switchAnswer}
          >
            {innerComment}
          </button>
        </div>
        <div className="admin-top-mid-qna"></div>
        <div className="admin-search-wrap">
          <div className="inquiry-keyword">
            <label htmlFor="option"></label>
            <select id="option" value={option} onChange={changeOption}>
              <option value={0}>타입</option>
              <option value={1}>전체</option>
              <option value={2}>상품</option>
              <option value={3}>배송</option>
              <option value={4}>결제</option>
              <option value={5}>기타</option>
            </select>
            <label htmlFor="type"></label>
            <select id="type" value={type} onChange={changeType}>
              <option value={"all"}>전체</option>
              <option value={"productNo"}>상품 번호</option>
              <option value={"productName"}>상품명</option>
              <option value={"title"}>제목</option>
              <option value={"memberEmail"}>작성자</option>
            </select>
          </div>
          <div className="search-input-wrap" id="inquiry-search">
            <button type="button" className="search-btn" onClick={searchQna}>
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
            <th>Q&A 번호</th>
            <th>상품 번호</th>
            <th>상품명</th>
            <th>분류</th>
            <th>제목</th>
            <th>공개여부</th>
            <th>작성일</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody id="admin-member-list-body">
          {qnaList.map((qna, i) => {
            return (
              <tr
                key={"pet" + i}
                onClick={() => {
                  navigate(`/admin/qna/${qna.qnaNo}`);
                }}
              >
                <td>{qna.qnaNo}</td>
                <td>{qna.productNo}</td>
                <td>{qna.productName}</td>
                {qna.qnaType === 1 ? (
                  <td>{"전체"}</td>
                ) : qna.qnaType === 2 ? (
                  <td>{"상품"}</td>
                ) : qna.qnaType === 3 ? (
                  <td>{"배송"}</td>
                ) : qna.qnaType === 4 ? (
                  <td>{"결제"}</td>
                ) : (
                  <td>{"기타"}</td>
                )}
                <td>{qna.qnaTitle}</td>
                {qna.qnaPublic === 0 ? <td>{"공개"}</td> : <td>{"비공개"}</td>}
                <td>{qna.qnaRegDate}</td>
                <td>{qna.qnaWriter}</td>
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
export default Qna;
