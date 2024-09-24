import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import axios from "axios";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";

const InquiryView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const inquiryNo = params.inquiryNo;
  const [inquiry, setInquiry] = useState({});
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [inquiryComment, setInquiryComment] = useState({
    inquiryNo: inquiryNo,
    inquiryCommentContent: "",
    memberEmail: loginEmail,
  });
  const [inquiryCommentList, setInquiryCommentList] = useState([]);
  const navigate = useNavigate();
  const changeInquiryCommentContent = (e) => {
    setInquiryComment({
      ...inquiryComment,
      inquiryCommentContent: e.target.value,
    });
  };
  useEffect(() => {
    axios
      .get(`${backServer}/inquiry/inquiryNo/${inquiryNo}`)
      .then((res) => {
        setInquiry(res.data);
        setInquiryCommentList(res.data.inquiryCommentList);
      })
      .catch((err) => {});
  }, [inquiryComment]);
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
              navigate("/inquiry/list");
            } else {
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
        .then((res) => {});
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
        ) : (
          ""
        )}
      </div>
      <div className="inquiry-comment">
        <div className="inquiry-comment-content">
          <div className="inquiry-sub-title">댓글</div>
          {loginEmail !== null ? (
            <div className="inquiry-comment-input">
              <div className="inquiry-comment-left">
                <p>{loginEmail}</p>
              </div>
              <div className="inquiry-comment-right">
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
            </div>
          ) : (
            ""
          )}
          {inquiryCommentList.length !== 0 ? (
            <ul>
              {inquiry.inquiryCommentList.map((comment, i) => {
                return (
                  <li key={"inquiryComment" + i} className="inquiry-comment">
                    <div className="inquiry-comment-left">
                      <p className="inquiry-comment-member">
                        {comment.memberEmail}
                      </p>
                      <p className="inquiry-comment-date">
                        {comment.inquiryCommentRegDate}
                      </p>
                      <p className="inquiry-comment-content">
                        {comment.inquiryCommentContent}
                      </p>
                    </div>
                    <div className="inquiry-comment-right"></div>
                  </li>
                );
              })}
              <li></li>
            </ul>
          ) : (
            <div className="inquiry-noComment">등록된 댓글이 없습니다.</div>
          )}
        </div>
      </div>
    </section>
  );
};
export default InquiryView;
