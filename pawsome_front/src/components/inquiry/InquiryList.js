import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginState } from "../utils/RecoilData";
import PageNavi from "../utils/PageNavi";

const InquiryList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [inquiryList, setInquiryList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const isLogin = useRecoilValue(isLoginState);
  useEffect(() => {
    axios
      .get(`${backServer}/inquiry/list/${reqPage}`)
      .then((res) => {
        setInquiryList(res.data.list);
        setPi(res.data.pi);
      })
      .catch(() => {});
  }, [reqPage]);
  return (
    <section className="section inquiry-list">
      <div className="admin-title">문의사항</div>
      <div className="admin-write-wrap">
        {isLogin ? (
          <div className="admin-top-left">
            <div className="admin-write">
              <Link to="/inquiry/write">글쓰기</Link>
            </div>
          </div>
        ) : (
          <div className="admin-top-left"></div>
        )}
        <div className="admin-top-mid"></div>
        <div className="admin-search-wrap">
          <div className="admin-write-right">
            <button>검색</button>
          </div>
        </div>
      </div>
      <table className="admin-tbl">
        <thead>
          <tr>
            <th>문의번호</th>
            <th>문의사항 제목</th>
            <th>문의시간</th>
            <th>문의타입</th>
            <th>문의자 이메일</th>
          </tr>
        </thead>
        <tbody>
          {inquiryList.map((inquiry, i) => {
            return (
              <tr
                key={"inquiry" + i}
                onClick={() => {
                  navigate(`/inquiry/view/${inquiry.inquiryNo}`);
                }}
              >
                <td>{inquiry.inquiryNo}</td>
                <td>{inquiry.inquiryTitle}</td>
                <td>{inquiry.inquiryRegDate}</td>
                {inquiry.inquiryType === 1 ? (
                  <td>계정 관련</td>
                ) : inquiry.inquiryType === 2 ? (
                  <td>게시판 관련</td>
                ) : inquiry.inquiryType === 3 ? (
                  <td>기타</td>
                ) : (
                  ""
                )}
                <td>{inquiry.memberEmail}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pageNavi-frm">
        <ul className="pageNavi-ul" id="inquiry-page">
          <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
        </ul>
      </div>
    </section>
  );
};
export default InquiryList;
