import { Routes, Route } from "react-router-dom";
import AllBoardList from "./AllBoardList";
import BoardList from "./BoardList";
import BoardView from "./BoardView";
import BoardWrite from "./BoardWrite";
import Map from "./Map";
import WalkMap from "./WalkMap";

const BoardMain = () => {
  return (
    <Routes>
      <Route path="allList" element={<AllBoardList />} />
      <Route path="list" element={<BoardList />} />
      <Route path="write" element={<BoardWrite />} />
      <Route path="view/:boardNo" element={<BoardView />} />
      <Route path="map" element={<Map />} />
      <Route path="walkMap" element={<WalkMap />} />
    </Routes>
  );
};

export default BoardMain;
