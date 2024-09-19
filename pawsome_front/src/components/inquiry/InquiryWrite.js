import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import { useState } from "react";

const InquiryWrite = () => {
  const navigate = useNavigate();
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [inquiry, setInquiry] = useState({});
  const [loginEmail, setLoginEmail] = useRecoilState(loginEmailState);
  const [inquiryTitle, setInquiryTitle] = useState("");
  const [inquiryContent, setInquiryContent] = useState("");
  return (
    <>
      <div></div>
    </>
  );
};
export default InquiryWrite;
