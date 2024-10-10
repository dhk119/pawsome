import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginEmailState, memberNicknameState } from "../../utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";
import * as DOMPurify from "dompurify";
import Swal from "sweetalert2";
import PageNavi from "./../../utils/PageNavi";

const Qna = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const productNo = params.productNo;
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const [qnaList, setQnaList] = useState(null);
  const [qnaAnswer, setQnaAnswer] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [totalCount, setTotalCount] = useState();
  const [qnaDelete, setQnaDelete] = useState(true);
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  useEffect(() => {
    axios
      .get(`${backServer}/product/qnaList/${productNo}/${reqPage}`)
      .then((res) => {
        const arr = qnaList.concat(res.data.list);
        setQnaList(arr);
        setPi(res.data.pi);
        setTotalCount(res.data.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage, qnaDelete]);

  const writeQna = () => {
    if (loginEmail === "test") {
      Swal.fire({
        title: "로그인 필요",
        text: "로그인 후 다시 시도해주세요",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#ffa518",
        confirmButtonText: "로그인페이지 이동",
        cancelButtonText: "계속 구경하기",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      navigate(`/market/main/productDetail/${productNo}/qna/writeQna`);
    }
  };

  return (
    <div className="qna-wrap">
      {/* if 걸어서 관리자면 문의 답변, 일반회원이면 문의작성 뜨게 */}
      <div>
        <button type="button" className="qna-wrtie-btn main" onClick={writeQna}>
          문의작성
        </button>
      </div>
      <div className="list-tbl-wrap">
        {qnaList ? (
          <>
            <table className="list-tbl">
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>NO</th>
                  <th style={{ width: "7%" }}>공개여부</th>
                  <th style={{ width: "8%" }}>카테고리</th>
                  <th style={{ width: "30%" }}>제목</th>
                  <th style={{ width: "15%" }}>작성자</th>
                  <th style={{ width: "15%" }}>작성일</th>
                  <th style={{ width: "10%" }}>답변여부</th>
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
                      qnaDelete={qnaDelete}
                      setQnaDelete={setQnaDelete}
                    />
                  );
                })}
              </tbody>
            </table>
            <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
          </>
        ) : (
          <div className="preview-reply">
            <div>
              <img src="/image/noreplyimg.png" />
            </div>
            <div>
              <span style={{ color: "#ccc", fontWeight: "bold" }}>
                아직 문의가 없어요!
              </span>
            </div>
          </div>
        )}
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
  const qnaDelete = props.qnaDelete;
  const setQnaDelete = props.setQnaDelete;
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
          .delete(`${backServer}/product/qna/${qna.qnaNo}`)
          .then((res) => {
            console.log(res);
            if (res.data === 1) {
              Swal.fire({
                title: "삭제 성공",
                text: "해당 문의가 삭제되었습니다.",
                icon: "success",
              });
              setQnaDelete(!qnaDelete);
              setToggle(!toggle);
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
  const deleteQnaAnswer = () => {
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
          .delete(`${backServer}/product/qnaAnswer/${qna.qnaNo}`)
          .then((res) => {
            console.log(res);
            if (res.data === 1) {
              Swal.fire({
                title: "삭제 성공",
                text: "해당 문의 답변이 삭제되었습니다.",
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
              ? qna.qnaWriter === memberNickname || memberNickname === "관리자"
                ? setToggle(!toggle)
                : setToggle(toggle)
              : setToggle(!toggle);
          }
        }}
      >
        <td>{qna.qnaNo}</td>
        <td>{qna.qnaPublic == 0 ? "공개" : "비공개"}</td>
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
            <td></td>
            <td></td>
            <td>본문</td>
            <td colSpan={3} className="content-box">
              {qna.qnaContent && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(String(qna.qnaContent)),
                  }}
                />
              )}
            </td>
            {qna.qnaWriter === memberNickname ? (
              <td className="btn-wrap">
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
            ) : memberNickname === "관리자" ? (
              qna.qnaAnswerContent === null ? (
                <td className="btn-wrap">
                  <button
                    type="button"
                    className="qna-wrtie-btn"
                    onClick={() => {
                      navigate(
                        `/market/main/productDetail/${productNo}/qna/writeQnaAnswer/${qna.qnaNo}`
                      );
                    }}
                  >
                    답변작성
                  </button>
                </td>
              ) : (
                ""
              )
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
            <td></td>
            <td></td>
            <td>답변</td>
            <td colSpan={3} className="content-answer-box">
              {qna.qnaAnswerContent && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(String(qna.qnaAnswerContent)),
                  }}
                />
              )}
              <div>{qna.qnaAnswerRegDate}</div>
            </td>
            {memberNickname === "관리자" ? (
              <td className="btn-wrap">
                <button
                  type="button"
                  className="qna-wrtie-btn"
                  onClick={() => {
                    navigate(
                      `/market/main/productDetail/${productNo}/qna/updateQnaAnswer/${qna.qnaNo}`
                    );
                  }}
                >
                  수정
                </button>
                <button
                  type="button"
                  className="qna-wrtie-btn"
                  onClick={deleteQnaAnswer}
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
    </>
  );
};

export default Qna;
