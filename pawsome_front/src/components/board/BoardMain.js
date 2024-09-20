import { Routes, Route } from "react-router-dom";
import AllBoardList from "./AllBoardList";
import BoardList from "./BoardList";
import BoardView from "./BoardView";

const BoardMain = () => {
  return (
    <Routes>
      <Route path="allList" element={<AllBoardList />} />
      <Route path="list" element={<BoardList />} />
      {/* <Route path="view/:boardNo" element={<BoardView />} /> */}
    </Routes>
  );
};

export default BoardMain;
