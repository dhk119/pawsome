import { useState } from "react";
import { Link } from "react-router-dom";

const HealthTest = () => {
  const [result, setResults] = useState([
    { name: "dog", count: 0 }, // 반려견
    { name: "cat", count: 0 }, // 반려묘
  ]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    gender: "",
    weight: "",
  });
  const [isTestStarted, setIsTestStarted] = useState(false);

  const questions = [
    {
      question: "이름을 입력해 주세요.",
      input: "text",
    },
    {
      question: "생년월일을 선택해 주세요.",
      input: "date",
    },
    {
      question: "성별을 선택해 주세요.",
      input: "gender",
    },
    {
      question: "체중 상태를 선택해 주세요.",
      input: "weight",
    },
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

  const age = calculateAge(formData.birthDate); // 생년월일로 나이 계산

  const testStart = () => {
    setIsTestStarted(true);
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
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthTest;
