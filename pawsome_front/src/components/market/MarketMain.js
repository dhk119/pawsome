import { Route, Routes } from "react-router-dom";
import ProductList from "./ProductList";
import "./market.css";

const MarketMain = () => {
  return (
    <Routes>
      <Route path="productList" element={<ProductList />}></Route>;
    </Routes>
  );
};

export default MarketMain;
