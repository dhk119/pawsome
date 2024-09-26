import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { memberNicknameState } from "../../utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";
import * as DOMPurify from "dompurify";

const Qna = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const productNo = params.productNo;
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const [qnaList, setQnaList] = useState([]);
  const [qnaAnswer, setQnaAnswer] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [totalCount, setTotalCount] = useState();
  useEffect(() => {
    axios
      .get(`${backServer}/product/qnaList/${productNo}/${reqPage}`)
      .then((res) => {
        console.log(res);
        setQnaList(res.data.list);
        setPi(res.data.pi);
        setTotalCount(res.data.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);

  return (
    <div className="qna-wrap">
      {/* if 걸어서 관리자면 문의 답변, 일반회원이면 문의작성 뜨게 */}
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
            {qnaList.map((qna, i) => {
              return (
                <QnaItem
                  key={"qna-" + i}
                  qna={qna}
                  productNo={productNo}
                  memberNickname={memberNickname}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const QnaItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const qna = props.qna;
  const productNo = props.productNo;
  const memberNickname = props.memberNickname;
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <tr
        onClick={() => {
          {
            qna.qnaPublic == 1
              ? qna.qnaWriter === memberNickname
                ? setToggle(!toggle)
                : setToggle(toggle)
              : setToggle(!toggle);
          }
        }}
      >
        <td>{qna.qnaNo}</td>
        <td>{qna.qnaType}</td>
        <td>{qna.qnaTitle}</td>
        <td>{qna.qnaWriter}</td>
        <td>{qna.qnaRegDate}</td>
        <td>{qna.qnaAnswerContent == null ? "N" : "Y"}</td>
      </tr>
      {qna.qnaContent != null ? (
        toggle ? (
          <tr>
            <td colSpan={5}>
              {qna.qnaContent && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(String(qna.qnaContent)),
                  }}
                />
              )}
            </td>
            {qna.qnaWriter === memberNickname ? (
              <td>
                <div
                  className="qna-wrtie-btn"
                  onClick={() => {
                    navigate(
                      `/market/main/productDetail/${productNo}/qna/updateQna/${qna.qnaNo}`
                    );
                  }}
                >
                  문의수정
                </div>
              </td>
            ) : (
              ""
            )}
          </tr>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      {qna.qnaAnswerContent != null ? (
        toggle ? (
          <tr>
            <td colSpan={6}>{qna.qnaAnswerContent}</td>
          </tr>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </>
  );
};

export default Qna;
