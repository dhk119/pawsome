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
      <div>문의사항</div>
      {isLogin ? <Link to="/inquiry/write">글쓰기</Link> : ""}
      <table className="inquiry-list-wrap">
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
                  navigate(`#`);
                }}
              >
                <td>{inquiry.inquiryNo}</td>
                <td>{inquiry.inquiryTitle}</td>
                <td>{inquiry.inquiryRegDate}</td>
                <td>{inquiry.inquiryType}</td>
                <td>{inquiry.memberEmail}</td>
              </tr>
            );
          })}
          <div>
            <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
          </div>
        </tbody>
      </table>
    </section>
  );
};
export default InquiryList;
