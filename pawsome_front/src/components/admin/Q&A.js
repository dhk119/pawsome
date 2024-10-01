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
  useEffect(() => {
    axios
      .get(`${backServer}/admin/qnaList/${reqPage}/${answer}`)
      .then((res) => {
        setQnaList(res.data.list);
        setPi(res.data.pi);
      });
  }, [reqPage, answer]);
  const switchAnswer = () => {
    setAnswer(answer === true ? false : true);
    setInnerComment(
      innerComment === "댓글 작성 Q&A로 전환"
        ? "댓글 미작성 Q&A로 전환"
        : "댓글 작성 Q&A로 전환"
    );
  };
  return (
    <section>
      <div className="admin-title">qna 리스트</div>
      <div className="admin-write-wrap" id="admin-qna-button-outside">
        <div className="admin-top-left" id="admin-qna-button-wrap">
          <button
            type="button"
            className="search-btn"
            id="admin-qna-button"
            onClick={switchAnswer}
          >
            {innerComment}
          </button>
        </div>
      </div>
      <table className="admin-tbl">
        <thead>
          <tr>
            <th>Q&A 번호</th>
            <th>상품 번호</th>
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
                <td>{qna.qnaType}</td>
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
