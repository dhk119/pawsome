import { Routes, Route } from "react-router-dom";
import AllBoardList from "./AllBoardList";
import BoardList from "./BoardList";

const BoardMain = () => {
  return (
    <Routes>
      <Route path="allList" element={<AllBoardList />} />
      <Route path="list" element={<BoardList />} />
    </Routes>
  );
};

export default BoardMain;
