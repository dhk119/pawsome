import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import axios from "axios";

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
};
export default InquiryView;
