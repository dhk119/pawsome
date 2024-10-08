import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import { useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import InquiryFrm from "./InquiryFrm";
import QuillEditor from "../utils/QuillEditor";

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
      form.append("inquiryType", inquiryType);
      form.append("memberEmail", loginEmail);
      axios
        .post(`${backServer}/inquiry`, form)
        .then((res) => {
          if (res.data > 0) {
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
    } else {
      Swal.fire({
        title: "입력값 누락",
        text: "누락된 입력값이 있습니다.",
        icon: "info",
        iconColor: "var(--point1)",
        confirmButtonColor: "var(--point1)",
      });
    }
  };
  return (
    <section>
      <div className="admin-title">문의사항 작성</div>
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
          inquiryType={inquiryType}
          setInquiryType={inputType}
        />
        <div className="inquiry-quill-editor">
          <QuillEditor
            content={inquiryContent}
            setContent={setInquiryContent}
          ></QuillEditor>
        </div>
        <div className="admin-flex-zone">
          <button
            className="admin-write-undo"
            type="button"
            onClick={() => {
              navigate("/inquiry/list");
            }}
          >
            작성취소
          </button>
          <button
            type="submit"
            className="admin-write-submit"
            id="inquiry-bottom-regist"
          >
            등록하기
          </button>
        </div>
      </form>
    </section>
  );
};
export default InquiryWrite;
