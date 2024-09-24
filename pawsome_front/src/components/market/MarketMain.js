import { Route, Routes } from "react-router-dom";
import "./market.css";
import MarketList from "./MainNav";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";

const MarketMain = () => {
  return (
    <Routes>
      <Route path="main/*" element={<ProductList />} />
      <Route path="productDetail/*" element={<ProductDetail />} />
    </Routes>
  );
};

export default MarketMain;
