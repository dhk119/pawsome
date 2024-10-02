import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InquiryFrm from "./InquiryFrm";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import QuillEditor from "../utils/QuillEditor";
import Swal from "sweetalert2";

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
    if (inquiryTitle !== "" && inquiryContent !== "<p><br></p>") {
      Swal.fire({
        text: "문의글을 수정하시겠습니까?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "수정",
        cancelButtonText: "취소",
        confirmButtonColor: "var(--point1)",
        cancelButtonColor: "var(--main1)",
        iconColor: "var(--main2)",
      }).then((result) => {
        if (result.isConfirmed) {
          const form = new FormData();
          form.append("inquiryNo", inquiryNo);
          form.append("inquiryTitle", inquiryTitle);
          form.append("inquiryContent", inquiryContent);
          form.append("inquiryType", inquiryType);
          axios
            .patch(`${backServer}/inquiry`, form)
            .then((res) => {
              if (res.data > 0) {
                Swal.fire({
                  text: "수정 완료",
                  icon: "success",
                  iconColor: "var(--main1)",
                  confirmButtonColor: "var(--point1)",
                });
                navigate(`/inquiry/view/${inquiryNo}`);
              }
            })
            .catch((err) => {});
        } else if (result.isDismissed) {
          navigate(`/inquiry/update/${inquiryNo}`);
        }
      });
    } else if (inquiryTitle === "" && inquiryContent !== "<p><br></p>") {
      Swal.fire({
        text: "제목을 입력하세요",
        icon: "info",
        iconColor: "var(--main2)",
        confirmButtonColor: "var(--point1)",
      });
    } else if (inquiryContent === "<p><br></p>") {
      Swal.fire({
        text: "내용을 입력하세요",
        icon: "info",
        iconColor: "var(--main2)",
        confirmButtonColor: "var(--point1)",
      });
    }
  };
  const undoUpdate = () => {
    navigate(`/inquiry/view/${inquiryNo}`);
  };
  useEffect(() => {
    axios
      .get(`${backServer}/inquiry/inquiryNo/${inquiryNo}`)
      .then((res) => {
        setInquiryTitle(res.data.inquiryTitle);
        setInquiryContent(res.data.inquiryContent);
        setInquiryType(res.data.inquiryType);
        setInquiryRegDate(res.data.inquiryRegDate);
      })
      .catch(() => {});
  }, []);
  return (
    <section>
      <div className="admin-title">문의사항 수정</div>
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
        <div className="inquiry-quill-editor">
          <QuillEditor
            content={inquiryContent}
            setContent={setInquiryContent}
          ></QuillEditor>
        </div>
        <div className="admin-button-zone">
          <button className="admin-write-submit" onClick={updateInquiry}>
            수정하기
          </button>
          <button className="admin-write-undo" onClick={undoUpdate}>
            수정취소
          </button>
        </div>
      </form>
    </section>
  );
};
export default InquiryUpdate;
