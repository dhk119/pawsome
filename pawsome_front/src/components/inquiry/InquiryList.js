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
      {isLogin ? (
        <div className="admin-write">
          <Link to="/inquiry/write">글쓰기</Link>
        </div>
      ) : (
        ""
      )}
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
                {inquiry.inquiryType === 1 ? <td></td> : <td></td>}
                <td>{inquiry.memberEmail}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ul>
        <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </ul>
    </section>
  );
};
export default InquiryList;
