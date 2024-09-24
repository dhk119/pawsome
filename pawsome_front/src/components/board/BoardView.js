import { useState } from "react";
import BoardNav from "./BoardNav";
import { useParams } from "react-router-dom";

const BoardView = () => {
  const params = useParams();
  const boardNo = params.boardNo;
  return (
    <section className="section board-view-wrap">
      <BoardNav />
      <div className="board-view-content">
        <div></div>
      </div>
      <div className="other-board-content"></div>
      <div className="reply-wrap"></div>
    </section>
  );
};

export default BoardView;
