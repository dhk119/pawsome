import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import axios from "axios";
import DOMPurify from "dompurify";

const InquiryView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const inquiryNo = params.inquiryNo;
  const [inquiry, setInquiry] = useState({});
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${backServer}/inquiry/inquiryNo/${inquiryNo}`)
      .then((res) => {
        setInquiry(res.data);
      })
      .catch((err) => {});
  }, []);
  const deleteBoard = () => {
    axios
      .delete(`${backServer}/inquiry/${inquiry.inquiryNo}`)
      .then((res) => {
        if (res.data > 0) {
          navigate("/inquiry/list");
        } else {
        }
      })
      .catch((err) => {});
  };
  return (
    <section>
      <div>게시글</div>
      <div>
        <div>
          <div>
            <table className="tbl">
              <tbody>
                <tr>
                  <td colSpan={4}>{inquiry.inquiryTitle}</td>
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
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(inquiry.inquiryContent),
            }}
          />
        </div>
        {loginEmail === inquiry.memberEmail ? (
          <div>
            <Link to={`/inquiry/update/${inquiry.inquiryNo}`}>수정</Link>
            <button type="button" onClick={deleteBoard}>
              삭제
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};
export default InquiryView;
