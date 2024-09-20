import { Route, Routes } from "react-router-dom";
import InquiryList from "./InquiryList";
import InquiryWrite from "./InquiryWrite";
import InquiryView from "./InquiryView";

const InquiryMain = () => {
  return (
    <Routes>
      <Route path="list" element={<InquiryList />}></Route>
      <Route path="write" element={<InquiryWrite />}></Route>
      <Route path="view/:inquiryNo" element={<InquiryView />}></Route>
    </Routes>
  );
};
export default InquiryMain;
