import { useState } from "react";

const BoardView = () => {
  const [board, setBoard] = useState({});
  return (
    <section className="section board-view-wrap">
      <div className="page-title">{board.boardTag}</div>
    </section>
  );
};

export default BoardView;
