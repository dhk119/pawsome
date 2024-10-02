import { Route, Routes } from "react-router-dom";
import InquiryList from "./InquiryList";
import InquiryWrite from "./InquiryWrite";
import InquiryView from "./InquiryView";
import InquiryUpdate from "./InquiryUpdate";
import InquirySearch from "./InquirySearch";

const InquiryMain = () => {
  return (
    <Routes>
      <Route path="list" element={<InquiryList />}></Route>
      <Route path="write" element={<InquiryWrite />}></Route>
      <Route path="view/:inquiryNo" element={<InquiryView />}></Route>
      <Route path="update/:inquiryNo" element={<InquiryUpdate />}></Route>
      <Route path="search" element={<InquirySearch />}></Route>
    </Routes>
  );
};
export default InquiryMain;
