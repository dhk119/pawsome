import { Link } from "react-router-dom";
import { useState } from "react";
import { type } from "@testing-library/user-event/dist/type";

const Mbti = () => {
  const [qNumber, setPage] = useState(-1); // 초기값 -1로 설정
  const [results, setResults] = useState({
    E: 0, //외향
    I: 0, //내향
    C: 0, //교감
    W: 0, //본능
    N: 0, //필요
    T: 0, //신뢰
    L: 0, //정착
    A: 0, //모험
  });

  const questions = [
    {
      question: "1. 오랜만에 산책을 나가려 한다. 어디로 갈까?",
      options: [
        { type: "E", text: "친구가 기다리고 있는 사람많은 공원" },
        { type: "I", text: "여유롭고 한산하며 혼자 즐길 수 있는 공원" },
      ],
    },
    {
      question:
        "2. 공원으로 가는 도중, 모르는 친구가 와서 반갑다며 인사를 한다. 어떻게 할까?",
      options: [
        { type: "E", text: "나도 반갑게 인사한다" },
        { type: "I", text: "누군지를 먼저 알아본다(경계)" },
      ],
    },
    {
      question: "3. 강아지와 놀 때 어떤 방식으로 놀고 싶나요?",
      options: [
        { type: "W", text: "공을 던져주며 같이 놀기" },
        { type: "C", text: "조용히 책 읽기" },
      ],
    },
    {
      question: "테스트가 완료되었습니다!",
      options: [{ text: "[ 결과보러가기 ]" }],
    },
    // 추가 질문 작성
  ];

  const answerClick = (type) => {
    setResults((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    nextQuestion();
  };

  const nextQuestion = () => {
    if (qNumber < questions.length - 1) {
      setPage(qNumber + 1);
    } else {
      alert("테스트가 완료되었습니다.");
      console.log("결과:", results);
    }
  };

  return (
    <div className="mbti-container">
      <Link to="/service/petService" style={{ color: "#ffa518" }}>
        메인으로
      </Link>
      <div className="dog-mbti">
        <h2 style={{ margin: "20px" }}>
          12문제로 알아보는 나의 강아지 유형 MBTI는? 테스트로 알아보자!
        </h2>
        {qNumber === -1 ? ( // 초기 상태에서 시작 버튼 보여주기 (0이되면 1번 문제 시작)
          <div className="test-main">
            <img
              src="/image/service/mbti-main.jpg"
              style={{ width: "600px" }}
            />
            <br />
            <span className="start-btn" onClick={() => setPage(0)}>
              테스트 시작하기
            </span>
          </div>
        ) : (
          <div className="question-box" style={{ margin: "20px" }}>
            <div className="question">{questions[qNumber].question}</div>
            {questions[qNumber].options.map((option, index) => (
              <div
                key={index}
                className="answer-box"
                onClick={() => answerClick(option.type)}
                style={{ margin: "20px" }}
              >
                {option.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mbti;
