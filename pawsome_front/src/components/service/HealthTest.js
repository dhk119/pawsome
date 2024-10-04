import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, loginEmailState } from "../utils/RecoilData";
import axios from "axios";

const HealthTest = () => {
  const [result, setResults] = useState([
    { name: "dog", count: 0 },
    { name: "cat", count: 0 },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 질문 인덱스
  const [selectedPet, setSelectedPet] = useState(null);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    gender: "",
    weight: "",
  });

  //피부
  const [selectedSkinIssues, setSelectedSkinIssues] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [skinScore, setSkinScore] = useState(100);
  //치아
  const [isDentalTestStarted, setIsDentalTestStarted] = useState(false);
  const [selectedDentalIssues, setSelectedDentalIssues] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [dentalScore, setDentalScore] = useState(100);
  //뼈
  const [isBoneTestStarted, setIsBoneTestStarted] = useState(false);
  const [selectedBoneIssues, setSelectedBoneIssues] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [boneScore, setBoneScore] = useState(100);
  //눈
  const [isEyeTestStarted, setIsEyeTestStarted] = useState(false);
  const [selectedEyeIssues, setSelectedEyeIssues] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [eyeScore, setEyeScore] = useState(100);
  //심장
  const [isHeartTestStarted, setIsHeartTestStarted] = useState(false);
  const [selectedHeartIssues, setSelectedHeartIssues] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [heartScore, setHeartScore] = useState(100);
  //면역력/호흡기
  const [isImmunityTestStarted, setIsImmunityTestStarted] = useState(false);
  const [selectedImmunityIssues, setSelectedImmunityIssues] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [immunityScore, setImmunityScore] = useState(100);

  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isStartWithoutPet, setIsStartWithoutPet] = useState(false);
  const [sessionPets, setSessionPets] = useState([]); // 세션에 등록된 반려동물 목록
  const isLogin = useRecoilValue(isLoginState); // 로그인 여부
  const [memberEmail, setMemberEmail] = useRecoilState(loginEmailState);
  const [isFinalScoreVisible, setIsFinalScoreVisible] = useState(false);

  useEffect(() => {
    axios
      .get(`${backServer}/pet/petList/${memberEmail}`)
      .then((res) => {
        console.log(res);
        setSessionPets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backServer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTestStarted(true);
  };

  const petSelection = (type) => {
    setSelectedPet(type);
  };
  //피부 문제페이지
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
  //치아 문제 페이지
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
  //뼈 문제 페이지
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

  //눈 문제 페이지
  const nextToEye = () => {
    setIsEyeTestStarted(true);
  };

  const EyeIssueChange = (index) => {
    setSelectedEyeIssues((prev) => {
      const newIssues = [...prev];
      newIssues[index] = !newIssues[index];
      const scoreChange = newIssues[index] ? -20 : 20;
      setEyeScore((prevScore) => prevScore + scoreChange);
      return newIssues;
    });
  };

  const noEyeIssues = () => {
    setSelectedEyeIssues([false, false, false, false]);
    setEyeScore(100);
  };

  //심장 문제 페이지
  const nextToHeart = () => {
    setIsHeartTestStarted(true);
  };

  const HeartIssueChange = (index) => {
    setSelectedHeartIssues((prev) => {
      const newIssues = [...prev];
      newIssues[index] = !newIssues[index];
      const scoreChange = newIssues[index] ? -20 : 20;
      setHeartScore((prevScore) => prevScore + scoreChange);
      return newIssues;
    });
  };

  const noHeartIssues = () => {
    setSelectedHeartIssues([false, false, false, false]);
    setHeartScore(100);
  };

  //면역력/호흡기 문제 페이지
  const nextToImmunity = () => {
    setIsImmunityTestStarted(true);
  };

  const ImmunityIssueChange = (index) => {
    setSelectedImmunityIssues((prev) => {
      const newIssues = [...prev];
      newIssues[index] = !newIssues[index];
      const scoreChange = newIssues[index] ? -20 : 20;
      setImmunityScore((prevScore) => prevScore + scoreChange);
      return newIssues;
    });
  };

  const noImmunityIssues = () => {
    setSelectedImmunityIssues([false, false, false, false]);
    setImmunityScore(100);
  };

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
  const eyeQuestionsList = [
    "눈이 예전과 달리 혼탁해졌어요.",
    "눈이 충혈되고 붓는 경우가 있어요",
    "눈을 제대로 뜨지 못하는 경우가 있어요.",
    "눈물을 많이 흘리는 편이에요.",
  ];
  const heartQuestionsList = [
    "저녁 시간대에 기침을 자주 해요.",
    "갑작스럽게 실신하듯 쓰러지는 경우가 있어요.",
    "운동을 하면 금방 지쳐요.",
    "자거나 쉬고 있을 때 숨을 빠르게 쉬어요.",
  ];
  const immunityQuestionsList = [
    "흥분했을때 켁켁거리는 기침을 자주 해요.",
    "가을, 겨울에 기침이 잦아요.",
    "콧물을 흘리는 경우가 있어요.",
    "눈곱이 많이 끼는 편이에요.",
  ];

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const [finalScores, setFinalScores] = useState(null); // 초기값을 null로 설정

  const startWithPet = () => {
    if (sessionPets.length > 0) {
      const pet = sessionPets[0]; // 첫 번째 반려동물 가져오기
      setFormData({
        name: pet.name,
        birthDate: pet.birthDate,
        gender: pet.gender,
        weight: pet.weight,
      });
      setSelectedPet(pet.type); // 반려동물 유형 설정
      setIsTestStarted(true); // 테스트 시작
    }
  };

  const startWithoutLogin = () => {
    console.log();
    setIsTestStarted(false);
  };

  const startWithoutPet = () => {
    setIsStartWithoutPet(true);
  };
  const resultSubmit = async () => {};

  const showFinalResults = () => {
    setIsFinalScoreVisible(true);
    setFinalScores({
      skin: skinScore,
      dental: dentalScore,
      bone: boneScore,
      eye: eyeScore,
      heart: heartScore,
      immunity: immunityScore,
    });
  };
  const getHealthStatus = (score) => {
    if (score <= 20) return "매우 위험 단계!";
    if (score <= 40) return "위험 단계!";
    if (score <= 60) return "주의 단계!";
    if (score <= 80) return "양호";
    return "건강";
  };
  const healthDescriptions = {
    skin: {
      "매우 위험 단계!":
        "피부 상태가 매우 좋지 않으며 지금 당장 수의사와의 상담이나 치료가 필요합니다! 가까운 동물병원에 당장 방문하세요.  ",
      "위험 단계!":
        "피부 상태가 좋지 않습니다. 정기적인 검진이나 치료가 필요합니다. 가까운 동물병원에 방문해주세요.",
      "주의 단계!":
        "피부 상태가 조금 좋지 않습니다! 안좋은곳을 파악하여 관리를 꾸준히 해주세요.",
      양호: "피부 상태가 양호합니다. 계속 관리하세요.",
      건강: "피부 상태가 아주 건강합니다!!",
    },
    dental: {
      low: "치아 상태가 좋지 않습니다. 치료가 필요할 수 있습니다.",
      medium: "치아 상태가 보통입니다. 정기적인 검진이 필요합니다.",
      high: "치아 상태가 양호합니다. 잘 관리하고 있습니다.",
    },
    bone: {
      low: "뼈 건강이 좋지 않습니다. 수의사와 상담하세요.",
      medium: "뼈 건강이 보통입니다. 주의가 필요합니다.",
      high: "뼈 건강이 양호합니다. 잘 관리하고 있습니다.",
    },
    eye: {
      low: "눈 건강이 좋지 않습니다. 치료가 필요할 수 있습니다.",
      medium: "눈 건강이 보통입니다. 정기적인 검진이 필요합니다.",
      high: "눈 건강이 양호합니다. 잘 관리하고 있습니다.",
    },
    heart: {
      low: "심장 건강이 좋지 않습니다. 즉시 상담하세요.",
      medium: "심장 건강이 보통입니다. 주의가 필요합니다.",
      high: "심장 건강이 양호합니다. 잘 관리하고 있습니다.",
    },
    immunity: {
      low: "면역력이 좋지 않습니다. 수의사와 상담하세요.",
      medium: "면역력이 보통입니다. 주의가 필요합니다.",
      high: "면역력이 양호합니다. 잘 관리하고 있습니다.",
    },
  };
  const getHealthStatusColor = (status) => {
    switch (status) {
      case "매우 위험 단계!":
        return "#ff0000"; // 매우 위험
      case "위험 단계!":
        return "#ff9999"; // 위험
      case "주의 단계!":
        return "#ffcc66"; // 주의
      case "양호":
        return "#66cc66"; // 양호
      case "건강":
        return "#5799ff"; // 건강
      default:
        return "#fff"; // 기본 색상
    }
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
              {isLogin ? (
                <>
                  <p>등록된 반려동물이 있습니다. 진행하시겠어요?</p>
                  <button onClick={startWithPet}>
                    등록된 반려동물로 시작하기
                  </button>
                  <h2>어떤 반려동물과 함께하고 있나요?</h2>
                  <div className="test-box">
                    <div
                      className="set-dog"
                      onClick={() => petSelection("반려견")}
                    >
                      <img src="/image/service/HealthTest/dog-im.png" />
                      <span>반려견</span>
                    </div>
                    <div
                      className="set-cat"
                      onClick={() => petSelection("반려묘")}
                    >
                      <img src="/image/service/HealthTest/cat-im.png" />
                      <span>반려묘</span>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <h2>어떤 반려동물과 함께하고 있나요?</h2>
                  <div className="test-box">
                    <div
                      className="set-dog"
                      onClick={() => petSelection("반려견")}
                    >
                      <img src="/image/service/HealthTest/dog-im.png" />
                      <span>반려견</span>
                    </div>
                    <div
                      className="set-cat"
                      onClick={() => petSelection("반려묘")}
                    >
                      <img src="/image/service/HealthTest/cat-im.png" />
                      <span>반려묘</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : !isTestStarted ? (
            <div>
              <h2>{selectedPet}의 정보를 입력해 주세요.</h2>
              <form className="petInfo-container" onSubmit={handleSubmit}>
                <div className="pet-input-box">
                  <label>이름 : </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="pet-input-box">
                  <label>생년월일 : </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="pet-input-box">
                  <label>성별 : </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">선택하세요</option>
                    <option value="male">수컷</option>
                    <option value="female">암컷</option>
                  </select>
                </div>
                <div className="pet-input-box">
                  <label>체중 상태 : </label>
                  <select
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">선택하세요</option>
                    <option value="thin">
                      이상적인 체중을 기준으로 약간 마름
                    </option>
                    <option value="normal">이상적인 상태(보통)</option>
                    <option value="slightly_overweight">
                      이상적인 체중을 기준으로 약간 살찜
                    </option>
                    <option value="obese">많이 살찜</option>
                  </select>
                </div>
                <button className="petTest-btn" type="submit">
                  정보 입력 완료
                </button>
              </form>
            </div>
          ) : !isDentalTestStarted ? (
            <div>
              <h1>피부 상태 질문</h1>
              <div className="test-box2">
                {skinQuestionsList.map((question, index) => (
                  <div
                    key={index}
                    className={`question-item ${
                      selectedSkinIssues[index] ? "selected" : ""
                    }`}
                    onClick={() => skinIssueChange(index)}
                  >
                    {question}
                  </div>
                ))}
              </div>
              <div>
                <button onClick={noSkinIssues} className="petTest-btn">
                  없어요
                </button>
                <button onClick={nextToDental} className="petTest-btn">
                  다음으로
                </button>
              </div>
            </div>
          ) : !isBoneTestStarted ? (
            <div>
              <h1>치아 상태 질문</h1>
              <div className="test-box2">
                {dentalQuestionsList.map((question, index) => (
                  <div
                    key={index}
                    className={`question-item ${
                      selectedDentalIssues[index] ? "selected" : ""
                    }`}
                    onClick={() => dentalIssueChange(index)}
                  >
                    {question}
                  </div>
                ))}
              </div>
              <div>
                <button onClick={noDentalIssues} className="petTest-btn">
                  없어요
                </button>
                <button onClick={nextToBone} className="petTest-btn">
                  다음으로
                </button>
              </div>
            </div>
          ) : !isEyeTestStarted ? (
            <div>
              <h1>뼈 상태 질문</h1>
              <div className="test-box2">
                {boneQuestionsList.map((question, index) => (
                  <div
                    key={index}
                    className={`question-item ${
                      selectedBoneIssues[index] ? "selected" : ""
                    }`}
                    onClick={() => boneIssueChange(index)}
                  >
                    {question}
                  </div>
                ))}
              </div>
              <div>
                <button onClick={noBoneIssues} className="petTest-btn">
                  없어요
                </button>
                <button onClick={nextToEye} className="petTest-btn">
                  다음으로
                </button>
              </div>
            </div>
          ) : !isHeartTestStarted ? (
            <div>
              <h1>눈 상태 질문</h1>
              <div className="test-box2">
                {eyeQuestionsList.map((question, index) => (
                  <div
                    key={index}
                    className={`question-item ${
                      selectedEyeIssues[index] ? "selected" : ""
                    }`}
                    onClick={() => EyeIssueChange(index)}
                  >
                    {question}
                  </div>
                ))}
              </div>
              <div>
                <button onClick={noEyeIssues} className="petTest-btn">
                  없어요
                </button>
                <button onClick={nextToHeart} className="petTest-btn">
                  다음으로
                </button>
              </div>
            </div>
          ) : !isImmunityTestStarted ? (
            <div>
              <h1>심장 상태 질문</h1>
              <div className="test-box2">
                {heartQuestionsList.map((question, index) => (
                  <div
                    key={index}
                    className={`question-item ${
                      selectedHeartIssues[index] ? "selected" : ""
                    }`}
                    onClick={() => HeartIssueChange(index)}
                  >
                    {question}
                  </div>
                ))}
              </div>
              <div>
                <button onClick={noHeartIssues} className="petTest-btn">
                  없어요
                </button>
                <button onClick={nextToImmunity} className="petTest-btn">
                  다음으로
                </button>
              </div>
            </div>
          ) : !isFinalScoreVisible ? (
            <div>
              <h1>면역력 / 호흡기 상태 질문</h1>
              <div className="test-box2">
                {immunityQuestionsList.map((question, index) => (
                  <div
                    key={index}
                    className={`question-item ${
                      selectedImmunityIssues[index] ? "selected" : ""
                    }`}
                    onClick={() => ImmunityIssueChange(index)}
                  >
                    {question}
                  </div>
                ))}
              </div>
              <div>
                <button onClick={noImmunityIssues} className="petTest-btn">
                  없어요
                </button>
                <button onClick={showFinalResults} className="petTest-btn">
                  결과 확인
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h1>테스트 결과</h1>
              <div className="result-box">
                {Object.keys(finalScores).map((key) => (
                  <div
                    key={key}
                    className="result-item"
                    style={{
                      backgroundColor: getHealthStatusColor(
                        getHealthStatus(finalScores[key])
                      ),
                    }}
                  >
                    {key === "skin"
                      ? "피부 상태"
                      : key === "dental"
                      ? "치아 점수"
                      : key === "bone"
                      ? "뼈 점수"
                      : key === "eye"
                      ? "눈 점수"
                      : key === "heart"
                      ? "심장 점수"
                      : "면역력 점수"}
                    : {finalScores[key]}점 <br />
                    {getHealthStatus(finalScores[key])}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthTest;
