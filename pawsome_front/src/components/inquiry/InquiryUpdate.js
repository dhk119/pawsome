import { useNavigate, useParams } from "react-router-dom";

const InquiryUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const inquiryNo = params.inquiryNo;
  return (
    <>
      <div></div>
    </>
  );
};
export default InquiryUpdate;
