import { Route, Routes } from "react-router-dom";
import InquiryList from "./InquiryList";
import InquiryWrite from "./InquiryWrite";

const InquiryMain = () => {
  return (
    <Routes>
      <Route path="list" element={<InquiryList />}></Route>
      <Route path="write" element={<InquiryWrite />}></Route>
    </Routes>
  );
};
export default InquiryMain;
