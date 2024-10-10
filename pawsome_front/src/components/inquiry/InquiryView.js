import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isLoginState,
  loginEmailState,
  memberLevelState,
} from "../utils/RecoilData";
import axios from "axios";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";

const InquiryView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const inquiryNo = params.inquiryNo;
  const [searchParams, setSearchParams] = useSearchParams();
  const [reqPage, setReqPage] = useState(Number(searchParams.get("reqPage")));
  const [type, setType] = useState(searchParams.get("type"));
  const [keyword, setKeyword] = useState(searchParams.get("keyword"));
  const [option, setOption] = useState(Number(searchParams.get("option")));
  const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
  const [inquiry, setInquiry] = useState({ inquiryCommentList: [] });
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const isLogin = useRecoilValue(isLoginState);
  const [inquiryComment, setInquiryComment] = useState({
    inquiryNo: inquiryNo,
    inquiryCommentContent: "",
    memberEmail: loginEmail,
  });
  const [commentContentList, setCommentContentList] = useState([]);
  const navigate = useNavigate();
  const changeInquiryCommentContent = (e) => {
    setInquiryComment({
      ...inquiryComment,
      inquiryCommentContent: e.target.value,
    });
  };
  const [buttonShowList, setButtonShowList] = useState([]);
  const [changeComment, setChangeComment] = useState(true);
  useEffect(() => {
    setButtonShowList([]);
    setCommentContentList([]);
    axios
      .get(`${backServer}/inquiry/inquiryNo/${inquiryNo}`)
      .then((res) => {
        setInquiry(res.data);
        for (
          let index = 0;
          index < res.data.inquiryCommentList.length;
          index++
        ) {
          buttonShowList.push(true);
        }
        setButtonShowList([...buttonShowList]);
      })
      .catch((err) => {
        Swal.fire({
          text: "문제가 발생하여 페이지를 불러올 수 없습니다",
          icon: "error",
          iconColor: "var(--main1)",
          confirmButtonColor: "var(--point1)",
        });
        navigate("/inquiry/list");
      });
  }, [changeComment]);
  const deleteInquiry = () => {
    Swal.fire({
      text: "문의글을 삭제하시겠습니까?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      confirmButtonColor: "var(--point1)",
      cancelButtonColor: "var(--main1)",
      iconColor: "var(--main2)",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${backServer}/inquiry/${inquiry.inquiryNo}`)
          .then((res) => {
            if (res.data > 0) {
              Swal.fire({
                text: "성공적으로 삭제되었습니다.",
                icon: "success",
                iconColor: "var(--main1)",
                confirmButtonColor: "var(--point1)",
              });
              navigate("/inquiry/list");
            }
          })
          .catch((err) => {});
      } else if (result.isDismissed) {
        navigate(`/inquiry/view/${inquiryNo}`);
      }
    });
  };
  const insertComment = () => {
    if (inquiryComment.inquiryCommentContent !== "") {
      axios
        .post(`${backServer}/inquiry/insertComment`, inquiryComment)
        .then((res) => {
          setInquiryComment({ ...inquiryComment, inquiryCommentContent: "" });
          changeComment === true
            ? setChangeComment(false)
            : setChangeComment(true);
        });
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
      <div className="admin-title">문의사항</div>
      <div>
        <div>
          <div>
            <table className="admin-frm">
              <tbody>
                <tr>
                  <th colSpan={4} id="inquiry-title">
                    {inquiry.inquiryTitle}
                  </th>
                </tr>
                <tr>
                  <th style={{ width: "20%" }}>작성자</th>
                  <td style={{ width: "30%" }}>{inquiry.memberEmail}</td>
                  <th style={{ width: "20%" }}>작성일</th>
                  <td style={{ width: "30%" }}>{inquiry.inquiryRegDate}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="inquiry-image">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(inquiry.inquiryContent),
            }}
          />
        </div>
        {loginEmail === inquiry.memberEmail ? (
          <div className="admin-button-zone">
            <button
              id="admin-delete"
              className="admin-write-undo"
              type="button"
              onClick={deleteInquiry}
            >
              삭제
            </button>
            <div className="admin-write-submit">
              <Link
                to={`/inquiry/update/${inquiry.inquiryNo}`}
                id="admin-update-btn"
              >
                수정
              </Link>
            </div>
          </div>
        ) : memberLevel === 1 ? (
          <div className="admin-button-zone">
            <button
              id="admin-delete"
              className="admin-write-undo"
              type="button"
              onClick={deleteInquiry}
            >
              삭제
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="inquiry-comment">
        <div className="inquiry-comment-content-wrap">
          <div className="inquiry-sub-title">댓글</div>
          {isLogin &&
          (loginEmail === inquiry.memberEmail || memberLevel === 1) ? (
            <div className="inquiry-comment-input">
              <div className="inquiry-comment-left" id="inquiry-input-email">
                <p>{loginEmail}</p>
              </div>
              <div className="inquiry-textarea">
                <textarea
                  onChange={changeInquiryCommentContent}
                  value={inquiryComment.inquiryCommentContent}
                ></textarea>
              </div>
              <div className="inquiry-button-zone">
                <button
                  type="button"
                  className="admin-write-submit"
                  id="inquiry-comment-button"
                  onClick={insertComment}
                >
                  등록
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
          {inquiry.inquiryCommentList.length !== 0 ? (
            <ul>
              {inquiry.inquiryCommentList.map((comment, i) => {
                commentContentList.push(comment.inquiryCommentContent);
                const deleteInquiryComment = () => {
                  axios
                    .delete(
                      `${backServer}/inquiry/inquiryComment/${comment.inquiryCommentNo}`
                    )
                    .then((res) => {
                      changeComment === true
                        ? setChangeComment(false)
                        : setChangeComment(true);
                    });
                };
                const updateInquiryComment = () => {
                  document.querySelectorAll(".inquiry-comment-text")[
                    i
                  ].readOnly = false;
                  buttonShowList[i] = false;
                  setButtonShowList([...buttonShowList]);
                };
                const undoUpdateInquiryComment = () => {
                  buttonShowList[i] = true;
                  setButtonShowList([...buttonShowList]);
                  document.querySelectorAll(".inquiry-comment-text")[
                    i
                  ].readOnly = true;
                  console.log(commentContentList[i]);
                  comment.inquiryCommentContent = commentContentList[i];
                  setInquiry({ ...inquiry });
                  changeComment === true
                    ? setChangeComment(false)
                    : setChangeComment(true);
                };
                const finalUpdateInquiryComment = () => {
                  if (comment.inquiryCommentContent) {
                    const form = new FormData();
                    form.append("inquiryCommentNo", comment.inquiryCommentNo);
                    form.append(
                      "inquiryCommentContent",
                      comment.inquiryCommentContent
                    );
                    axios
                      .patch(`${backServer}/inquiry/comment`, form)
                      .then((res) => {
                        changeComment === true
                          ? setChangeComment(false)
                          : setChangeComment(true);
                        buttonShowList[i] = true;
                        setButtonShowList([...buttonShowList]);
                        document.querySelectorAll(".inquiry-comment-text")[
                          i
                        ].readOnly = true;
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
                const changeInquiryCommentContent = (e) => {
                  comment.inquiryCommentContent = e.target.value;
                  setInquiry({ ...inquiry });
                };
                return (
                  <li key={"inquiryComment" + i} className="inquiry-comments">
                    <div className="inquiry-comment-content">
                      <div className="inquiry-comment-left">
                        <p className="inquiry-comment-member">
                          {comment.memberEmail}
                        </p>
                        <p className="inquiry-comment-date">
                          {comment.inquiryCommentRegDate}
                        </p>
                      </div>
                      <div className="inquiry-comment-mid">
                        <div className="inquiry-comment-textarea">
                          <textarea
                            className="inquiry-comment-text"
                            readOnly
                            onChange={changeInquiryCommentContent}
                            value={comment.inquiryCommentContent}
                          ></textarea>
                        </div>
                        {isLogin &&
                        loginEmail == comment.memberEmail &&
                        buttonShowList[i] === true ? (
                          <div className="inquiry-comment-right">
                            <div className="inquiry-comment-button-zone">
                              <div className="admin-write-submit">
                                <button
                                  className="admin-write-submit"
                                  type="button"
                                  onClick={updateInquiryComment}
                                >
                                  수정
                                </button>
                              </div>
                              <button
                                id="admin-delete"
                                className="admin-write-undo"
                                type="button"
                                onClick={deleteInquiryComment}
                              >
                                삭제
                              </button>
                            </div>
                          </div>
                        ) : isLogin &&
                          loginEmail == comment.memberEmail &&
                          buttonShowList[i] === false ? (
                          <div className="inquiry-comment-right">
                            <div className="inquiry-comment-button-zone">
                              <div className="admin-write-submit">
                                <button
                                  className="admin-write-submit"
                                  type="button"
                                  onClick={finalUpdateInquiryComment}
                                >
                                  수정완료
                                </button>
                              </div>
                              <button
                                id="admin-delete"
                                className="admin-write-undo"
                                type="button"
                                onClick={undoUpdateInquiryComment}
                              >
                                수정취소
                              </button>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="inquiry-noComment">등록된 댓글이 없습니다.</div>
          )}
        </div>
      </div>
      <div className="admin-list-button-zone">
        <button
          className="admin-write-submit"
          type="button"
          onClick={() => {
            if (keyword) {
              navigate(
                `/inquiry/search?reqPage=${reqPage}&type=${type}&keyword=${keyword}&option=${option}`
              );
            } else {
              navigate(`/inquiry/search?reqPage=${reqPage}&option=${option}`);
            }
          }}
        >
          이전으로
        </button>
      </div>
    </section>
  );
};
export default InquiryView;
