import { Link } from "react-router-dom";
import { useState } from "react";

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
      question: "3. 가고 있는데 친구들이 모여 놀고 있다! 나는 어떻게 할까?",
      options: [
        { type: "E", text: "같이 놀자며 달려간다" },
        { type: "I", text: "그냥 놀고있는 모습을 구경한다" },
      ],
    },
    {
      question: "4. 또 가고 있었는데 갈림길이 나왔다! 나는 어떤 길로 갈까?",
      options: [
        { type: "L", text: "혹시 몰라! 매일 매일 가던 왼쪽길!" },
        { type: "A", text: "오늘은 특별하게 가야지! 오른쪽으로 가자!" },
      ],
    },
    {
      question:
        "5. 갈림길을 넘었는데, 누군가가 길을 물어본다. 뭐라고 설명해줄까?",
      options: [
        {
          type: "W",
          text: "왼쪽길로 가시면 도서관이 나오는데 거기에서 오른쪽으로 가면 있어요! 라고 구체적으로 설명한다",
        },
        {
          type: "C",
          text: "저기 큰 도로 옆으로 쭉가세요! 라고 단순하게 큰길로 설명한다",
        },
      ],
    },
    {
      question: "테스트가 완료되었습니다!",
      options: [{ text: "[ 결과보러가기 ]" }],
    },
    // 추가 질문 작성
  ];
  const [showResults, setShowResults] = useState(false); // 결과 화면 표시 여부

  const answerClick = (type) => {
    setResults((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    nextQuestion();
  };

  const nextQuestion = () => {
    if (qNumber < questions.length - 1) {
      setPage(qNumber + 1);
    } else {
      setShowResults(true); // 결과 화면 표시
      console.log("결과:", results);
    }
  };

  const renderResults = () => {
    // 결과를 계산하여 표시하는 로직
    return (
      <div className="results">
        <h2>테스트 결과</h2>
        <p>외향: {results.E}</p>
        <p>내향: {results.I}</p>
        <p>교감: {results.C}</p>
        <p>본능: {results.W}</p>
        <p>필요: {results.N}</p>
        <p>신뢰: {results.T}</p>
        <p>정착: {results.L}</p>
        <p>모험: {results.A}</p>
      </div>
    );
  };
  return (
    <div className="mbti-container">
      <Link to="/service/petService" style={{ color: "#ffa518" }}>
        메인으로
      </Link>
      <div className="dog-mbti">
        <h2
          style={{ margin: "20px", fontWeight: "bolder", fontSize: "x-large" }}
        >
          12문제로 알아보는 나의 강아지 유형 MBTI는? 테스트로 알아보자!
        </h2>
        {qNumber === -1 ? ( // 초기 상태에서 시작 버튼 보여주기 (0이되면 1번 문제 시작)
          <div className="test-main">
            <img
              src="/image/service/mbti-main.jpg"
              style={{ width: "600px" }}
            />
            <br />
            <br />
            <span className="start-btn" onClick={() => setPage(0)}>
              테스트 시작하기
            </span>
          </div>
        ) : showResults ? ( // 결과 화면 표시
          renderResults()
        ) : (
          <div className="qna-box" style={{ margin: "20px" }}>
            <img src="/image/service/siba.png" style={{ width: "500px" }} />
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
