import { Route, Routes } from "react-router-dom";
import ProductRegist from "./ProductRegist";
import ProductList from "./ProductList";
import "./admin.css";
import MemberList from "./MemberList";
import ProductView from "./ProductView";
import Admin from "./Admin";
import PetList from "./PetList";
import Qna from "./Q&A";
import QnaView from "./Q&A(view)";
import PetChart from "./PetChart";
import ProductChart from "./ProductChart";
import BoardList from "./BoardList";
const AdminMain = () => {
  return (
    <section>
      <Routes>
        <Route path="main" element={<Admin />}></Route>
        <Route path="productView/:productNo" element={<ProductView />}></Route>
        <Route path="productList" element={<ProductList />}></Route>
        <Route path="productRegist" element={<ProductRegist />}></Route>
        <Route path="memberList" element={<MemberList />}></Route>
        <Route path="petList" element={<PetList />}></Route>
        <Route path="productChart" element={<ProductChart />}></Route>
        <Route path="petChart" element={<PetChart />}></Route>
        <Route path="qnaList" element={<Qna />}></Route>
        <Route path="qna/:qnaNo" element={<QnaView />}></Route>
        <Route path="boardList" element={<BoardList />}></Route>
      </Routes>
    </section>
  );
};
export default AdminMain;
