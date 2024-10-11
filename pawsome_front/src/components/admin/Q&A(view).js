import axios from "axios";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import QuillEditor from "../utils/QuillEditor";
import Swal from "sweetalert2";
import { memberLevelState, memberNicknameState } from "../utils/RecoilData";
import Interceptor from "./Interceptor";

const QnaView = () => {
  const params = useParams();
  const qnaNo = params.qnaNo;
  const navigate = useNavigate();
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [qna, setQna] = useState({});
  const [qnaAnswerCon, setQnaAnswerCon] = useState("");
  const [content, setContent] = useState("");
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const [qnaAns, setQnaAns] = useState({});
  const [changeQna, setChangeQna] = useState(false);
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  useEffect(() => {
    memberLevel === 1
      ? axios.get(`${backServer}/admin/qna/${qnaNo}`).then((res) => {
          setQna(res.data);
          setContent(res.data.qnaAnswerContent);
        })
      : Swal.fire({
          text: "접근 권한이 없습니다",
          icon: "info",
          iconColor: "#ffa518",
          confirmButtonColor: "#ffa518",
        });
  }, [changeQna]);
  const insertQnaAnswer = () => {
    if (qnaAnswerCon !== "<p><br></p>" && qnaAnswerCon !== "") {
      const form = new FormData();
      form.append("qnaNo", qnaNo);
      form.append("qnaAnswerContent", qnaAnswerCon);
      form.append("qnaAnswerWriter", memberNickname);
      axios
        .post(`${backServer}/admin/qna`, form)
        .then((res) => {
          setQnaAnswerCon("");
          changeQna === true ? setChangeQna(false) : setChangeQna(true);
        })
        .catch((err) => {});
    } else {
      Swal.fire({
        text: "답변 내용을 입력하세요",
        icon: "info",
        iconColor: "var(--main1)",
        confirmButtonColor: "var(--point1)",
      });
    }
  };
  const deleteQnaAnswer = () => {
    Swal.fire({
      text: "답변을 삭제하시겠습니까?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      confirmButtonColor: "var(--point1)",
      cancelButtonColor: "var(--main1)",
      iconColor: "var(--main2)",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${backServer}/admin/qna/${qnaNo}`).then((res) => {
          Swal.fire({
            text: "성공적으로 삭제되었습니다.",
            icon: "success",
            iconColor: "var(--main1)",
            confirmButtonColor: "var(--point1)",
          });
          navigate("/admin/qnaList");
          changeQna === true ? setChangeQna(false) : setChangeQna(true);
        });
      } else if (result.isDismissed) {
      }
    });
  };
  const updateQnaAnswer = () => {
    if (content !== "<p><br></p>" && content !== "") {
      const form = new FormData();
      form.append("qnaNo", qnaNo);
      form.append("qnaAnswerContent", content);
      axios
        .patch(`${backServer}/admin/qna`, form)
        .then((res) => {
          changeQna === true ? setChangeQna(false) : setChangeQna(true);
          Swal.fire({
            text: "수정 완료",
            icon: "success",
            iconColor: "var(--main1)",
            confirmButtonColor: "var(--point1)",
          });
        })
        .catch((err) => {});
    } else {
      Swal.fire({
        text: "답변 내용을 입력하세요",
        icon: "info",
        iconColor: "var(--main1)",
        confirmButtonColor: "var(--point1)",
      });
    }
  };
  return (
    <section>
      {memberLevel === 1 ? (
        <div>
          <div className="admin-title">Q&A</div>
          <div>
            <div>
              <div>
                <table className="admin-frm">
                  <tbody>
                    <tr>
                      <th colSpan={8} id="inquiry-title">
                        {qna.qnaTitle}
                      </th>
                    </tr>
                    <tr>
                      <th style={{ width: "10%" }}>작성자</th>
                      <td style={{ width: "10%" }}>{qna.qnaWriter}</td>
                      <th style={{ width: "10%" }}>작성일</th>
                      <td style={{ width: "30%" }}>{qna.qnaRegDate}</td>
                      <th style={{ width: "10%" }}>타입</th>
                      {qna.qnaType === 1 ? (
                        <td style={{ width: "10%" }}>전체</td>
                      ) : qna.qnaType === 2 ? (
                        <td style={{ width: "10%" }}>상품</td>
                      ) : qna.qnaType === 3 ? (
                        <td style={{ width: "10%" }}>배송</td>
                      ) : qna.qnaType === 4 ? (
                        <td style={{ width: "10%" }}>결제</td>
                      ) : (
                        <td style={{ width: "10%" }}>기타</td>
                      )}
                      <th style={{ width: "10%" }}>제품번호</th>
                      <td style={{ width: "10%" }}>{qna.productNo}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="inquiry-image">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(qna.qnaContent),
                }}
              />
            </div>
            <div className="inquiry-comment">
              <div className="inquiry-comment-content-wrap">
                <div className="inquiry-sub-title">답변</div>
                {qna.qnaAnswerWriter ? (
                  <ul>
                    <li className="inquiry-comments">
                      <div className="inquiry-comment-content">
                        <div className="admin-qna-flex">
                          <div className="inquiry-comment-left" id="">
                            <p className="admin-qna-text">
                              {qna.qnaAnswerWriter}
                            </p>
                            <p>{qna.qnaAnswerRegDate}</p>
                          </div>
                        </div>
                        <div
                          className="inquiry-comment-mid"
                          id="admin-qna-bottom"
                        >
                          <div className="inquiry-comment-textarea">
                            <QuillEditor
                              content={content}
                              setContent={setContent}
                            ></QuillEditor>
                          </div>
                          <div
                            className="inquiry-comment-right"
                            id="admin-margin-top"
                          >
                            <div className="inquiry-comment-button-zone">
                              <div className="admin-write-submit">
                                <button
                                  className="admin-write-submit"
                                  type="button"
                                  onClick={updateQnaAnswer}
                                >
                                  수정
                                </button>
                              </div>
                              <button
                                id="admin-delete"
                                className="admin-write-undo"
                                type="button"
                                onClick={deleteQnaAnswer}
                              >
                                삭제
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                ) : (
                  <div>
                    <div
                      className="inquiry-comment-left"
                      id="admin-qna-input-nick"
                    >
                      <p>{memberNickname}</p>
                    </div>
                    <div className="admin-qna-quill">
                      <QuillEditor
                        setContent={setQnaAnswerCon}
                        content={qnaAnswerCon}
                      ></QuillEditor>
                    </div>
                    <div className="admin-qna-button">
                      <button
                        type="button"
                        className="admin-write-submit"
                        onClick={insertQnaAnswer}
                      >
                        등록
                      </button>
                    </div>
                    <div className="inquiry-noComment" id="qna-noAns">
                      등록된 답변이 없습니다.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Interceptor />
      )}
    </section>
  );
};

export default QnaView;
