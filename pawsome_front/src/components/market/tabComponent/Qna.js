import { Link } from "react-router-dom";

const Qna = () => {
  const qnaList = {
    qnaNo: "01",
    qnaType: "1",
    qnaTitle: "배송은 언제 오나요",
    qnaWriter: "회원1",
    qnaRegDate: "2024-09-23 10:17:22",
    qnaAnswer: "N",
  };
  return (
    <div className="qna-wrap">
      <div>
        <Link to="writeQna" className="qna-wrtie-btn">
          문의작성
        </Link>
      </div>
      <div className="list-tbl-wrap">
        <table className="list-tbl">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>NO</th>
              <th style={{ width: "10%" }}>카테고리</th>
              <th style={{ width: "35%" }}>제목</th>
              <th style={{ width: "15%" }}>작성자</th>
              <th style={{ width: "15%" }}>작성일</th>
              <th style={{ width: "10%" }}>답변</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{qnaList.qnaNo}</td>
              <td>{qnaList.qnaType}</td>
              <td>{qnaList.qnaTitle}</td>
              <td>{qnaList.qnaWriter}</td>
              <td>{qnaList.qnaRegDate}</td>
              <td>{qnaList.qnaAnswer}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Qna;
