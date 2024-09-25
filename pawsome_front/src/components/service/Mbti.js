import { Link } from "react-router-dom";
import { useState } from "react";

const Mbti = () => {
  const [qNumber, setPage] = useState(-1); // 초기값 -1로 설정
  const [results, setResults] = useState([
    { name: "I", count: 0 }, //내향
    { name: "E", count: 0 }, //외향
    { name: "C", count: 0 }, //교감
    { name: "W", count: 0 }, //본능
    { name: "N", count: 0 }, //필요
    { name: "T", count: 0 }, //신뢰
    { name: "L", count: 0 }, //정착
    { name: "A", count: 0 }, //모험
  ]);

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
          type: "C",
          text: "왼쪽길로 가시면 도서관이 나오는데 거기에서 오른쪽으로 가면 있어요! 라고 구체적으로 설명한다",
        },
        {
          type: "W",
          text: "저기 큰 도로 옆으로 쭉가세요! 라고 단순하게 큰길로 설명한다",
        },
      ],
    },
    {
      question: "6. 공원에 도착했다! 나에게는?",
      options: [
        {
          type: "W",
          text: "공원에 왔다! 라는게 중요함",
        },
        {
          type: "C",
          text: "공원에 오는 과정이 중요함",
        },
      ],
    },
    {
      question:
        "7. 공원에서 쉬는 중, 어떤 친구가 짜증이 난다며 투덜투덜대며 나에게 다가온다.",
      options: [
        {
          type: "C",
          text: "'속상해? 기분풀어~~'라고 먼저 격려해준다",
        },
        {
          type: "W",
          text: "무슨일인지 먼저 물어본다",
        },
      ],
    },
    {
      question:
        "8. 덕분에 친구의 마음이 풀렸다. 근데 벌써 집에 갈 시간이다. 친구와 다음에 만나기로 약속하며",
      options: [
        {
          type: "T",
          text: "언제쯤에 만날까? 시간은? 어디서?",
        },
        {
          type: "N",
          text: "그냥 일단 둘 다 시간날때만나자~",
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
    setResults((prev) => {
      return prev.map((item) => {
        if (item.name === type) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
    });
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
    const result = setMbti();
    let content = "";
    mc.forEach((element) => {
      if (element.mbti == result) {
        content = element.contents;
      }
    });
    // 결과를 계산하여 표시하는 로직
    return (
      //결과 화면 출력함
      <div className="results">
        <h2>테스트 결과</h2>
        <p>당신의 DBTI는? : {result}</p>
        <p>유형 :{content}</p>
      </div>
    );
  };
  // 최종 mbti 결과를 담을 상태
  const [mbtiContents, setMbtiContents] = useState([]);
  const mc = [
    { mbti: "WTIL", contents: ["엄마 껌딱지 겁쟁이"] },
    { mbti: "WTIA", contents: ["조심스러운 관찰견"] },
    { mbti: "WTEL", contents: ["초면엔 신중, 구면엔 친구"] },
    { mbti: "WTEA", contents: ["허세부리는 호기심쟁이"] },
    { mbti: "WNIL", contents: ["까칠한 지킬앤 하이드"] },
    { mbti: "WNIA", contents: ["선긋는 외톨이 야생견"] },
    { mbti: "WNIL", contents: ["패닉에 빠진 극소심견"] },
    { mbti: "WNEA", contents: ["동네 대장 일진"] },
    { mbti: "CTEL", contents: ["신이 내린 반려특화견"] },
    { mbti: "CTEA", contents: ["인간사회 적응 만렙"] },
    { mbti: "CTIA", contents: ["가족빼곤 다 싫어"] },
    { mbti: "CTIL", contents: ["모범견계의 엄친아"] },
    { mbti: "CNEA", contents: ["똥꼬발랄 핵인싸"] },
    { mbti: "CNEL", contents: ["곱게자란 막내딸"] },
    { mbti: "CNIL", contents: ["치고 빠지고 밀당 천재"] },
    { mbti: "CNIA", contents: ["주위 관심없는 나 혼자 산다"] },
  ];
  function setMbti() {
    let WorC = //data : result(mbti문제푼결과)를 대표하는 변수
      results.find((data) => data.name === "W").count >
      results.find((data) => data.name === "C").count
        ? "W"
        : "C";

    let NorT =
      results.find((data) => data.name === "N").count >
      results.find((data) => data.name === "T").count
        ? "N"
        : "T";

    let IorE =
      results.find((data) => data.name === "I").count >
      results.find((data) => data.name === "E").count
        ? "I"
        : "E";

    let LorA =
      results.find((data) => data.name === "L").count >
      results.find((data) => data.name === "A").count
        ? "L"
        : "A";
    let mbti = WorC + NorT + IorE + LorA;
    /* setMbtiContents([mc.filter((val) => val.mbti === mbti)[0]]);*/

    return mbti;
  }
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
