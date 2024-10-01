import axios from "axios";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import QuillEditor from "../utils/QuillEditor";
import Swal from "sweetalert2";
import { memberNicknameState } from "../utils/RecoilData";

const QnaView = () => {
  const params = useParams();
  const qnaNo = params.qnaNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [qna, setQna] = useState({});
  const [qnaAnswerCon, setQnaAnswerCon] = useState("");
  const [content, setContent] = useState("");
  const [memberNickname, setMemberNickname] =
    useRecoilState(memberNicknameState);
  const [qnaAns, setQnaAns] = useState({});
  const [changeQna, setChangeQna] = useState(false);
  useEffect(() => {
    axios.get(`${backServer}/admin/qna/${qnaNo}`).then((res) => {
      setQna(res.data);
      setContent(res.data.qnaAnswerContent);
    });
  }, [changeQna]);
  const insertQnaAnswer = () => {
    if (qnaAnswerCon !== "<p><br><p>" && qnaAnswerCon !== "") {
      const form = new FormData();
      form.append("qnaNo", qnaNo);
      form.append("qnaAnswerContent", qnaAnswerCon);
      form.append("qnaAnswerWriter", memberNickname);
      axios
        .post(`${backServer}/admin/qna/insertAns`, form)
        .then((res) => {
          setQnaAnswerCon("");
          changeQna === true ? setChangeQna(false) : setChangeQna(true);
        })
        .catch((err) => {
          console.log(err);
        });
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
    axios.delete(`${backServer}/qna/qnaAns/${qna.qnaAnswerNo}`).then((res) => {
      changeQna === true ? setChangeQna(false) : setChangeQna(true);
    });
  };
  const updateQnaAnswer = () => {
    if (qna.qnaAnswerContent !== "<p><br><p>") {
      const form = new FormData();
      form.append("qnaAnswerNo", qna.qnaAnsNo);
      form.append("qnaAnswerContent", qna.qnaAnswerContent);
      axios
        .patch(`${backServer}/inquiry/comment`, form)
        .then((res) => {
          changeQna === true ? setChangeQna(false) : setChangeQna(true);
        })
        .catch((err) => {});
    } else {
      Swal.fire({
        text: "댓글 내용을 입력하세요",
        icon: "info",
        iconColor: "var(--main1)",
        confirmButtonColor: "var(--point1)",
      });
    }
  };
  return (
    <section>
      <div className="admin-title">Q&A</div>
      <div>
        <div>
          <div>
            <table className="admin-frm">
              <tbody>
                <tr>
                  <th colSpan={4} id="inquiry-title">
                    {qna.qnaTitle}
                  </th>
                </tr>
                <tr>
                  <th style={{ width: "20%" }}>작성자</th>
                  <td style={{ width: "30%" }}>{qna.qnaWriter}</td>
                  <th style={{ width: "20%" }}>작성일</th>
                  <td style={{ width: "30%" }}>{qna.qnaRegDate}</td>
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
            <div>
              <div className="inquiry-comment-left" id="admin-qna-input-nick">
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
            </div>
            {qna.qnaAnswerWriter ? (
              <ul>
                <li className="inquiry-comments">
                  <div className="inquiry-comment-content">
                    <div className="admin-qna-flex">
                      <div className="inquiry-comment-left" id="">
                        <p className="admin-qna-text">{qna.qnaAnswerWriter}</p>
                        <p>{qna.qnaAnswerRegDate}</p>
                      </div>
                    </div>
                    <div className="inquiry-comment-mid" id="admin-qna-bottom">
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
              <div className="inquiry-noComment" id="qna-noAns">
                등록된 답변이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QnaView;
