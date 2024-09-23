import { Route, Routes } from "react-router-dom";
import ProductRegist from "./ProductRegist";
import ProductList from "./ProductList";

const AdminMain = () => {
  return (
    <>
      <div>
        <section>
          <Routes>
            <Route path="productRegist" element={<ProductRegist />}></Route>
            <Route path="productList" element={<ProductList />}></Route>
          </Routes>
        </section>
      </div>
    </>
  );
};
export default AdminMain;
