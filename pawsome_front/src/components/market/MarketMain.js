import { Route, Routes } from "react-router-dom";
import "./market.css";
import MarketList from "./MainNav";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import MainNav from "./MainNav";
import Payment from "./Payment";

const MarketMain = () => {
  return (
    <Routes>
      <Route path="main/*" element={<MainNav />} />
      <Route path="payment/:str" element={<Payment />} />
    </Routes>
  );
};

export default MarketMain;
