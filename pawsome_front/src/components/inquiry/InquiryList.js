import { useState } from "react";

const InquiryList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [inquiryList, setInquiryList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  return (
    <>
      <div></div>
    </>
  );
};
export default InquiryList;
