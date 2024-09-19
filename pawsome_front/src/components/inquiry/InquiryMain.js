import { Route, Routes } from "react-router-dom";
import InquiryList from "./InquiryList";

const InquiryMain = () => {
  return (
    <Routes>
      <Route path="list" element={<InquiryList />}></Route>
    </Routes>
  );
};
export default InquiryMain;
