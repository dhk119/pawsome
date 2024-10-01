import { useState } from "react";
import { Link } from "react-router-dom";

const HealthTest = () => {
  const [result, setResults] = useState([
    { name: "dog", count: 0 },
    { name: "cat", count: 0 },
  ]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    gender: "",
    weight: "",
  });
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [selectedSkinIssues, setSelectedSkinIssues] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [skinScore, setSkinScore] = useState(100);
  const [isDentalTestStarted, setIsDentalTestStarted] = useState(false);
  const [selectedDentalIssues, setSelectedDentalIssues] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [dentalScore, setDentalScore] = useState(100);
  const [isBoneTestStarted, setIsBoneTestStarted] = useState(false);
  const [selectedBoneIssues, setSelectedBoneIssues] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [boneScore, setBoneScore] = useState(100);

  const questions = [
    { question: "이름을 입력해 주세요.", input: "text" },
    { question: "생년월일을 선택해 주세요.", input: "date" },
    { question: "성별을 선택해 주세요.", input: "gender" },
    { question: "체중 상태를 선택해 주세요.", input: "weight" },
  ];

  const skinQuestionsList = [
    "피부에 털빠짐이 있어요.",
    "피부를 자주 가려워하는 편이에요.",
    "귀 피부가 빨갛고 부어있어요.",
    "발끝을 수시로 핥거나 깨물어요.",
  ];

  const dentalQuestionsList = [
    "양치질을 아파하는것 같아요.",
    "이빨 색이 누렇게 보여요.",
    "갈수록 입냄새가 심해져요.",
    "침을 많이 흘리는 편이에요.",
  ];

  const boneQuestionsList = [
    "한쪽다리를 잘 딛지 못해요.",
    "예전처럼 활발하게 뛰어놀지 못해요.",
    "걷는 모습이 어딘지 모르게 불편해보여요.",
    "이유없이 아파하거나 몸을 떠는 경우가 있어요.",
  ];

  const petSelection = (type) => {
    setResults((prevResults) =>
      prevResults.map((pet) =>
        pet.name === type ? { ...pet, count: pet.count + 1 } : pet
      )
    );
    setSelectedPet(type);
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return "";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const age = calculateAge(formData.birthDate);

  const testStart = () => {
    setIsTestStarted(true);
  };

  const skinIssueChange = (index) => {
    setSelectedSkinIssues((prev) => {
      const newIssues = [...prev];
      newIssues[index] = !newIssues[index];
      const scoreChange = newIssues[index] ? -20 : 20;
      setSkinScore((prevScore) => prevScore + scoreChange);
      return newIssues;
    });
  };

  const noSkinIssues = () => {
    setSelectedSkinIssues([false, false, false, false]);
    setSkinScore(100);
  };

  const nextToDental = () => {
    setIsDentalTestStarted(true);
  };

  const dentalIssueChange = (index) => {
    setSelectedDentalIssues((prev) => {
      const newIssues = [...prev];
      newIssues[index] = !newIssues[index];
      const scoreChange = newIssues[index] ? -20 : 20;
      setDentalScore((prevScore) => prevScore + scoreChange);
      return newIssues;
    });
  };

  const noDentalIssues = () => {
    setSelectedDentalIssues([false, false, false, false]);
    setDentalScore(100);
  };

  const nextToBone = () => {
    setIsBoneTestStarted(true);
  };

  const boneIssueChange = (index) => {
    setSelectedBoneIssues((prev) => {
      const newIssues = [...prev];
      newIssues[index] = !newIssues[index];
      const scoreChange = newIssues[index] ? -20 : 20;
      setBoneScore((prevScore) => prevScore + scoreChange);
      return newIssues;
    });
  };

  const noBoneIssues = () => {
    setSelectedBoneIssues([false, false, false, false]);
    setBoneScore(100);
  };

  return (
    <div className="container">
      <Link to="/service/petService" style={{ color: "#ffa518" }}>
        메인으로
      </Link>
      <div className="service-wrap">
        <h1>나의 반려동물 건강 체크</h1>
        <img
          src="/image/service/HealthTest/healthMain.png"
          style={{ width: "300px" }}
        />
        <div className="feedtest">
          {!selectedPet ? (
            <div>
              <h2>어떤 반려동물과 함께하고 있나요?</h2>
              <div className="test-box">
                <div className="set-dog" onClick={() => petSelection("반려견")}>
                  <img src="/image/service/HealthTest/dog-im.png" />
                  <span>반려견</span>
                </div>
                <div className="set-cat" onClick={() => petSelection("반려묘")}>
                  <img src="/image/service/HealthTest/cat-im.png" />
                  <span>반려묘</span>
                </div>
              </div>
            </div>
          ) : !isTestStarted ? (
            <div>
              {questions.map((question, index) => (
                <div key={index}>
                  <h2>{question.question}</h2>
                  {question.input === "text" && (
                    <input
                      type="text"
                      name="name"
                      placeholder="이름을 입력해 주세요."
                      value={formData.name}
                      onChange={inputChange}
                    />
                  )}
                  {question.input === "date" && (
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={inputChange}
                    />
                  )}
                  {question.input === "gender" && (
                    <div>
                      <button
                        onClick={() =>
                          setFormData({ ...formData, gender: "남" })
                        }
                      >
                        남
                      </button>
                      <button
                        onClick={() =>
                          setFormData({ ...formData, gender: "여" })
                        }
                      >
                        여
                      </button>
                    </div>
                  )}
                  {question.input === "weight" && (
                    <select
                      name="weight"
                      value={formData.weight}
                      onChange={inputChange}
                    >
                      <option value="">체중 상태 선택</option>
                      <option value="마름">
                        이상적인 체중을 기준으로 약간 마름
                      </option>
                      <option value="보통">이상적인 상태 (보통)</option>
                      <option value="살찜">
                        이상적인 체중을 기준으로 살찜
                      </option>
                    </select>
                  )}
                </div>
              ))}
              <div className="result">
                <h3>{selectedPet}</h3>
                <p>이름: {formData.name}</p>
                <p>생년월일: {formData.birthDate}</p>
                <p>나이: {age}세</p>
                <p>성별: {formData.gender}</p>
                <p>체중 상태: {formData.weight}</p>
              </div>
              <button onClick={testStart}>테스트 진행하기</button>
            </div>
          ) : !isDentalTestStarted ? (
            <div>
              <h2>피부 상태 질문</h2>
              {skinQuestionsList.map((question, index) => (
                <div key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedSkinIssues[index]}
                      onChange={() => skinIssueChange(index)}
                    />
                    {question}
                  </label>
                </div>
              ))}
              <div>
                <button onClick={noSkinIssues}>없어요</button>
                <button onClick={nextToDental}>다음으로</button>
              </div>
              <div>
                <h3>현재 피부 점수: {skinScore}</h3>
              </div>
            </div>
          ) : !isBoneTestStarted ? (
            <div>
              <h2>치아 상태 질문</h2>
              {dentalQuestionsList.map((question, index) => (
                <div key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedDentalIssues[index]}
                      onChange={() => dentalIssueChange(index)}
                    />
                    {question}
                  </label>
                </div>
              ))}
              <div>
                <button onClick={noDentalIssues}>없어요</button>
                <button onClick={nextToBone}>다음으로</button>
              </div>
              <div>
                <h3>현재 치아 점수: {dentalScore}</h3>
              </div>
            </div>
          ) : (
            <div>
              <h2>뼈 상태 질문</h2>
              {boneQuestionsList.map((question, index) => (
                <div key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedBoneIssues[index]}
                      onChange={() => boneIssueChange(index)}
                    />
                    {question}
                  </label>
                </div>
              ))}
              <div>
                <button onClick={noBoneIssues}>없어요</button>
                <button
                  onClick={() =>
                    alert(
                      `최종 피부 점수: ${skinScore}, 최종 치아 점수: ${dentalScore}, 최종 뼈 점수: ${boneScore}`
                    )
                  }
                >
                  결과 확인
                </button>
              </div>
              <div>
                <h3>현재 뼈 점수: {boneScore}</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthTest;
