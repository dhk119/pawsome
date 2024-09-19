import { Route, Routes } from "react-router-dom";
import ProductRegist from "./ProductRegist";

const AdminMain = () => {
  return (
    <>
      <div>관리자 페이지</div>
      <div>
        <section>
          <Routes>
            <Route path="productregist" element={<ProductRegist />}></Route>
          </Routes>
        </section>
      </div>
    </>
  );
};
export default AdminMain;
