import { Route, Routes } from "react-router-dom";
import "./market.css";
import MarketList from "./MainNav";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import MainNav from "./MainNav";
import PaySuccess from "./PaySuccess";
import Payment from "./Payment";
import PayCancel from "./PayCancel";
import WriteReview from "./reviewComponent/WriteReview";
import UpdateReview from "./reviewComponent/UpdateReivew";

const MarketMain = () => {
  return (
    <Routes>
      <Route path="main/*" element={<MainNav />} />
      <Route path="payment/:str" element={<Payment />} />
      <Route path="payment/success" element={<PaySuccess />} />
      <Route path="payment/payCancel" element={<PayCancel />} />
      {/* 나중에 경로 수정 */}
      <Route path="writeReview" element={<WriteReview />} />
      <Route path="updateReview" element={<UpdateReview />} />
    </Routes>
  );
};

export default MarketMain;
