import { useState } from "react";

const BoardView = () => {
  const [board, setBoard] = useState({});
  return (
    <section className="section board-view-wrap">
      <div className="page-title">#태그</div>
    </section>
  );
};

export default BoardView;
