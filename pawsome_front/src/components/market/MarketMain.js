import { Route, Routes } from "react-router-dom";
import "./market.css";
import MarketList from "./MainNav";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import MainNav from "./MainNav";

const MarketMain = () => {
  return (
    <Routes>
      <Route path="main/*" element={<MainNav />} />
    </Routes>
  );
};

export default MarketMain;
