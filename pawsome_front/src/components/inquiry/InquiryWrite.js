import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import InquiryFrm from "./InquiryFrm";
import Quill from "quill";

const InquiryWrite = () => {
  const navigate = useNavigate();
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [inquiryTitle, setInquiryTitle] = useState("");
  const [inquiryContent, setInquiryContent] = useState("");
  const [inquiryType, setInquiryType] = useState(0);
  const inputTitle = (e) => {
    setInquiryTitle(e.target.value);
  };
  const inputType = (e) => {
    setInquiryType(e.target.value);
  };
  const writeInquiry = () => {
    if (inquiryTitle !== "" && inquiryContent !== "" && inquiryType !== 0) {
      const form = new FormData();
      form.append("inquiryTitle", inquiryTitle);
      form.append("inquiryContent", inquiryContent);
      form.append("memberEmail", loginEmail);
      axios
        .post(`${backServer}/inquiry`, form)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            navigate("/inquiry/list");
          } else {
            Swal.fire({
              title: "에러발생",
              text: "에러가 발생했습니다",
              icon: "error",
            });
          }
        })
        .catch((err) => {});
    }
  };
  return (
    <section>
      <div className="page-title">문의사항 작성</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          writeInquiry();
        }}
      >
        <InquiryFrm
          inquiryTitle={inquiryTitle}
          setInquiryTitle={inputTitle}
          loginEmail={loginEmail}
        />
        <div></div>
        <div className="button-zone">
          <button type="submit">등록하기</button>
        </div>
      </form>
    </section>
  );
};
export default InquiryWrite;
