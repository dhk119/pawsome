import { Route, Routes } from "react-router-dom";
import ProductRegist from "./ProductRegist";
import ProductList from "./ProductList";
import "./admin.css";
import MemberList from "./MemberList";
import ProductView from "./ProductView";
import Admin from "./Admin";
import PetList from "./PetList";
const AdminMain = () => {
  return (
    <>
      <section>
        <Routes>
          <Route path="productRegist" element={<ProductRegist />}></Route>
          <Route
            path="productView/:productNo"
            element={<ProductView />}
          ></Route>
          <Route path="main" element={<Admin />}></Route>
          <Route path="memberList" element={<MemberList />}></Route>
          <Route path="productList" element={<ProductList />}></Route>
          <Route path="petList" element={<PetList />}></Route>
        </Routes>
      </section>
    </>
  );
};
export default AdminMain;
