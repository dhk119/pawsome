import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InquiryFrm from "./InquiryFrm";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import QuillEditor from "../utils/QuillEditor";

const InquiryUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const inquiryNo = params.inquiryNo;
  const loginEmail = useRecoilState(loginEmailState);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [inquiryTitle, setInquiryTitle] = useState("");
  const [inquiryContent, setInquiryContent] = useState("");
  const [inquiryType, setInquiryType] = useState(0);
  const [inquiryRegDate, setInquiryRegDate] = useState("");
  const inputTitle = (e) => {
    setInquiryTitle(e.target.value);
  };
  const inputType = (e) => {
    setInquiryType(e.target.value);
  };
  const updateInquiry = () => {
    if (inquiryTitle !== "" && inquiryContent !== "") {
      const form = new FormData();
      form.append("inquiryNo", inquiryNo);
      form.append("inquiryTitle", inquiryTitle);
      form.append("inquiryContent", inquiryContent);
      form.append("inquiryType", inquiryType);
      axios
        .patch(`${backServer}/inquiry`, form)
        .then((res) => {
          if (res.data > 0) {
            navigate(`/inquiry/view/${inquiryNo}`);
          } else {
          }
        })
        .catch((err) => {});
    }
  };
  useEffect(() => {
    axios
      .get(`${backServer}/inquiry/inquiryNo/${inquiryNo}`)
      .then((res) => {
        setInquiryTitle(res.data.inquiryTitle);
        setInquiryContent(res.data.inquiryContent);
        console.log(res.data.inquiryType);
        setInquiryType(res.data.inquiryType);
        setInquiryRegDate(res.data.inquiryRegDate);
      })
      .catch(() => {});
  }, []);
  return (
    <section>
      <div>문의사항 수정</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <InquiryFrm
          inquiryTitle={inquiryTitle}
          setInquiryTitle={inputTitle}
          loginEmail={loginEmail}
          inquiryType={inquiryType}
          setInquiryType={inputType}
        />
        <div className="board-content-wrap">
          <QuillEditor
            content={inquiryContent}
            setContent={setInquiryContent}
          ></QuillEditor>
        </div>
        <div>
          <button onClick={updateInquiry}>수정하기</button>
        </div>
      </form>
    </section>
  );
};
export default InquiryUpdate;
