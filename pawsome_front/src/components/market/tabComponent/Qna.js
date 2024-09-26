import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { memberNicknameState } from "../../utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";
import * as DOMPurify from "dompurify";
import Swal from "sweetalert2";

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
  const deleteQna = () => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ffa518",
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        axios
          .delete(`${backServer}/qna/${qna.qnaNo}`)
          .then((res) => {
            console.log(res);
            if (res.data === 1) {
              Swal.fire({
                title: "삭제 성공",
                text: "해당 문의가 삭제되었습니다.",
                icon: "success",
              });
              navigate(`/market/main/productDetail/${productNo}/qna`);
            } else {
              Swal.fire({
                title: "삭제 실패",
                text: "나중에 다시 시도해주세요",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  return (
    <>
      <tr
        className="main-tr"
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
        <td>
          {qna.qnaType == 1
            ? "전체"
            : qna.qnaType == 2
            ? "상품문의"
            : qna.qnaType == 3
            ? "배송문의"
            : qna.qnaType == 4
            ? "결제문의"
            : "기타"}
        </td>
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
                <button
                  type="button"
                  className="qna-wrtie-btn"
                  onClick={() => {
                    navigate(
                      `/market/main/productDetail/${productNo}/qna/updateQna/${qna.qnaNo}`
                    );
                  }}
                >
                  수정
                </button>
                <button
                  type="button"
                  className="qna-wrtie-btn"
                  onClick={deleteQna}
                >
                  삭제
                </button>
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
