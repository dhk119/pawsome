import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, loginEmailState } from "../utils/RecoilData";
import axios from "axios";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
const HealthTest = () => {
  const [selectedWeightManagementTip, setSelectedWeightManagementTip] =
    useState("");
  const [selectedPet, setSelectedPet] = useState(null);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [formData, setFormData] = useState({
    no: "",
    name: "",
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
  const [sessionPets, setSessionPets] = useState([]);
  const isLogin = useRecoilValue(isLoginState);
  const [memberEmail, setMemberEmail] = useRecoilState(loginEmailState);
  const [isFinalScoreVisible, setIsFinalScoreVisible] = useState(false);
  const [data, setData] = useState([
    {
      name: "피부",
      score: skinScore,
    },
    {
      name: "치아",
      score: dentalScore,
    },
    {
      name: "뼈",
      score: boneScore,
    },
    {
      name: "눈",
      score: eyeScore,
    },
    {
      name: "심장",
      score: heartScore,
    },
    {
      name: "면역력",
      score: immunityScore,
    },
  ]);

  useEffect(() => {
    axios
      .get(`${backServer}/pet/petList/${memberEmail}`)
      .then((res) => {
        setSessionPets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backServer, isLogin]);

  const saveStatus = () => {
    axios.post(`${backServer}/pet/saveStatus`, saveResultStatus).then((res) => {
      Swal.fire({
        text: "저장에 성공하였습니다 !",
        icon: "success",
        iconColor: "#5799ff",
        confirmButtonColor: "#5799ff",
      });
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedWeightManagementTip(weightManagementTips[formData.weight]);
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

  const [finalScores, setFinalScores] = useState({
    skin: 0,
    dental: 0,
    bone: 0,
    eye: 0,
    heart: 0,
    immunity: 0,
  });

  const weightManagementTips = {
    thin: "체중이 약간 마른 상태입니다. 적절한 영양 공급과 함께 건강한 체중을 유지하세요.",
    normal: "체중이 정상입니다. 꾸준한 운동과 균형 잡힌 식사를 유지하세요.",
    overweight: "체중이 약간 살찐 상태입니다. 다이어트를 고려해보세요.",
    veryOverweight:
      "체중이 많이 살찐 상태입니다. 전문가의 도움을 받는 것이 좋습니다.",
  };

  const petDataSelection = (pet) => {
    setSelectedPet(pet.petName);
    setFormData({
      name: pet.name,
      no: pet.petNo,
    });
    setIsTestStarted(false);
  };
  const weightStatus = {
    thin: 1,
    normal: 2,
    overweight: 3,
    veryOverweight: 4,
  };
  const setWeightResult = (formData) => {
    if (formData.weight === "thin") return weightStatus.thin;
    if (formData.weight === "normal") return weightStatus.normal;
    if (formData.weight === "overweight") return weightStatus.overweight;
    if (formData.weight === "veryOverweight")
      return weightStatus.veryOverweight;
  };
  const [saveResultStatus, setSaveResultStatus] = useState({
    petNo: 0,
    petWeightStatus: 0,
    petSkinStatus: 0,
    petDentalStatus: 0,
    petBoneStatus: 0,
    petEyeStatus: 0,
    petHeartStatus: 0,
    petImmunityStatus: 0,
  });

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
    setSaveResultStatus({
      //axios로 보내주는 점수와 번호
      petNo: formData.no,
      petWeightStatus: setWeightResult(formData),
      petSkinStatus: skinScore,
      petDentalStatus: dentalScore,
      petBoneStatus: boneScore,
      petEyeStatus: eyeScore,
      petHeartStatus: heartScore,
      petImmunityStatus: immunityScore,
    });
    const newData = [
      { name: "피부", score: skinScore },
      { name: "치아", score: dentalScore },
      { name: "뼈", score: boneScore },
      { name: "눈", score: eyeScore },
      { name: "심장", score: heartScore },
      { name: "면역력", score: immunityScore },
    ];

    setData(newData);
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
        "피부 상태가 조금 좋지 않습니다! 동물병원을 방문하거나 관리를 꾸준히 해주세요. ",
      양호: "피부 상태가 양호합니다. 계속 관심을 가져주세요.",
      건강: "피부 상태가 아주 건강합니다!!",
    },
    dental: {
      "매우 위험 단계!":
        "치아 상태가 매우 좋지 않으며 지금 당장 수의사와의 상담이나 치료가 필요합니다! 가까운 동물병원에 당장 방문하세요.  ",
      "위험 단계!":
        "치아 상태가 좋지 않습니다. 정기적인 검진이나 치료가 필요합니다. 가까운 동물병원에 방문해주세요.",
      "주의 단계!":
        "치아 상태가 조금 좋지 않습니다! 동물병원을 방문하거나 관리를 꾸준히 해주세요. ",
      양호: "치아 상태가 양호합니다. 계속 관심을 가져주세요.",
      건강: "치아 상태가 아주 건강합니다!!",
    },
    bone: {
      "매우 위험 단계!":
        "뼈가 매우 좋지 않으며 지금 당장 수의사와의 상담이나 치료가 필요합니다! 가까운 동물병원에 당장 방문하세요.  ",
      "위험 단계!":
        "뼈가 좋지 않습니다. 정기적인 검진이나 치료가 필요합니다. 가까운 동물병원에 방문해주세요.",
      "주의 단계!":
        "뼈가 조금 좋지 않습니다! 동물병원을 방문하거나 관리를 꾸준히 해주세요. ",
      양호: "뼈가 양호합니다. 계속 관심을 가져주세요.",
      건강: "뼈가 아주 건강합니다!!",
    },
    eye: {
      "매우 위험 단계!":
        "눈이 매우 좋지 않으며 지금 당장 수의사와의 상담이나 치료가 필요합니다! 가까운 동물병원에 당장 방문하세요.  ",
      "위험 단계!":
        "눈 상태가 좋지 않습니다. 정기적인 검진이나 치료가 필요합니다. 가까운 동물병원에 방문해주세요.",
      "주의 단계!":
        "눈이 조금 좋지 않습니다!동물병원을 방문하거나 관리를 꾸준히 해주세요. ",
      양호: "눈이 양호합니다. 계속 관심을 가져주세요.",
      건강: "눈이 아주 건강합니다!!",
    },
    heart: {
      "매우 위험 단계!":
        "심장 상태가 매우 좋지 않으며 지금 당장 수의사와의 상담이나 치료가 필요합니다! 가까운 동물병원에 당장 방문하세요.  ",
      "위험 단계!":
        "심장 상태가 좋지 않습니다. 정기적인 검진이나 치료가 필요합니다. 가까운 동물병원에 방문해주세요.",
      "주의 단계!":
        "심장 상태가 조금 좋지 않습니다!동물병원을 방문하거나 관리를 꾸준히 해주세요. ",
      양호: "심장 상태가 양호합니다. 계속 관심을 가져주세요.",
      건강: "심장 상태가 아주 건강합니다!!",
    },
    immunity: {
      "매우 위험 단계!":
        "면역력이나 호흡기가 매우 좋지 않으며 지금 당장 수의사와의 상담이나 치료가 필요합니다! 가까운 동물병원에 당장 방문하세요.  ",
      "위험 단계!":
        "면역력이나 호흡기가 좋지 않습니다. 정기적인 검진이나 치료가 필요합니다. 가까운 동물병원에 방문해주세요.",
      "주의 단계!":
        "면역력이나 호흡기가 조금 좋지 않습니다! 안좋은곳을 파악하여 관리를 꾸준히 해주세요.",
      양호: "면역력이나 호흡기가 양호합니다. 계속 관리하세요.",
      건강: "면역력이나 호흡기가 아주 건강합니다!!",
    },
  };
  const getHealthStatusColor = (status) => {
    switch (status) {
      case "매우 위험 단계!":
        return "#ff0000";
      case "위험 단계!":
        return "#ff9999";
      case "주의 단계!":
        return "#ffcc66";
      case "양호":
        return "#66cc66";
      case "건강":
        return "#5799ff";
      default:
        return "#fff";
    }
  };

  const healthLabels = {
    skin: "피부",
    dental: "치아",
    bone: "뼈",
    eye: "눈",
    heart: "심장",
    immunity: "면역력",
  };

  const onClickDownloadButton = () => {
    const target = document.getElementById("result");
    if (!target) {
      return alert("사진 저장에 실패했습니다.");
    }
    html2canvas(target).then((canvas) => {
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.href = canvas.toDataURL("image/png");
      link.download = "HealthTest.png"; // 다운로드 이미지 파일 이름
      link.click();
      document.body.removeChild(link);
    });
  };
  return (
    <>
      <nav className="nav-box">
        <ul>
          <li className="nav-btn">
            <Link to="/service/PetService">전체</Link>
          </li>
          <li className="nav-btn">
            <Link to="/service/allMap">시설검색</Link>
          </li>
          <li className="nav-btn">
            <Link to="/service/mbti">멍BTI</Link>
          </li>
          <li className="nav-btn">
            <Link to="/service/healthTest">건강체크</Link>
          </li>
        </ul>
      </nav>
      <div className="HT-container">
        <div className="service-wrap">
          <h1>나의 반려동물 건강 체크</h1>
          <img
            src="/image/service/HealthTest/healthMain.png"
            style={{ width: "350px", marginTop: "20px" }}
          />
          <div className="feedtest">
            {!selectedPet ? (
              <div>
                {isLogin ? (
                  <>
                    <p style={{ fontSize: "x-large", fontWeight: "bold" }}>
                      등록된 반려동물이 있습니다. 진행하시겠어요?
                    </p>
                    <select
                      className="HT-Select"
                      onChange={(e) => {
                        const selectedPet = sessionPets.find(
                          (pet) => pet.petName === e.target.value
                        );
                        if (selectedPet) {
                          petDataSelection(selectedPet);
                        }
                      }}
                    >
                      <option value="">반려동물 선택</option>
                      {sessionPets.map((pet, index) => (
                        <option key={index} value={pet.petName}>
                          {pet.petName}
                        </option>
                      ))}
                    </select>
                    <div style={{ width: "400px", margin: "0 auto" }}>
                      <br />
                      <h3>이전에 검사하신 기록을 확인하실 수 있어요.</h3>
                      <button className="record-btn">
                        <Link to="/service/healthTestRecord">
                          등록된 반려동물의 건강테스트 기록보기
                        </Link>
                      </button>
                    </div>
                    <h2>어떤 반려동물과 함께하고 있나요?</h2>
                    <div className="test-box">
                      <div
                        className="set-dog"
                        onClick={() => petSelection("반려견")}
                      >
                        <span>반려견</span>
                        <img src="/image/service/HealthTest/dog-im.png" />
                      </div>
                      <div
                        className="set-cat"
                        onClick={() => petSelection("반려묘")}
                      >
                        <span>반려묘</span>
                        <img src="/image/service/HealthTest/cat-im.png" />
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
                        <span>반려견</span>
                        <img src="/image/service/HealthTest/dog-im.png" />
                      </div>
                      <div
                        className="set-cat"
                        onClick={() => petSelection("반려묘")}
                      >
                        <span>반려묘</span>
                        <img src="/image/service/HealthTest/cat-im.png" />
                      </div>
                    </div>
                    <h3>
                      로그인 후 나의 반려동물 건강정보를 저장하고 확인하실 수
                      있습니다.
                    </h3>
                    <button className="record-btn">
                      <Link to="/login">로그인하기</Link>
                    </button>
                    <button className="record-btn">
                      <Link to="/join">회원가입 바로가기</Link>
                    </button>
                  </div>
                )}
              </div>
            ) : !isTestStarted ? (
              <div>
                <h2>{selectedPet}의 체중을 선택해 주세요.</h2>
                <form className="petInfo-container" onSubmit={handleSubmit}>
                  <div className="pet-input-box">
                    <label>체중 상태 : </label>
                    <select
                      className="HT-Select"
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
                      <option value="overweight">
                        이상적인 체중을 기준으로 약간 살찜
                      </option>
                      <option value="veryOverweight">많이 살찜</option>
                    </select>
                  </div>
                  <button className="petTest-btn" type="submit">
                    입력 완료
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
                <div className="result-box" id="result">
                  <h1>- {selectedPet}의 건강테스트 결과 -</h1>
                  <BarChart
                    width={700}
                    height={400}
                    data={data}
                    barSize={80}
                    barGap={20}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      domain={[20, 100]}
                      ticks={[15, 35, 55, 80, 105]}
                      tickFormatter={(value) => {
                        if (value <= 20) return "매우 위험";
                        if (value <= 40) return "위험";
                        if (value <= 60) return "주의";
                        if (value <= 80) return "양호";
                        return "건강";
                      }}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="score"
                      fill="#5799ff"
                      shape={(props) => {
                        const { score } = props;
                        let fillColor;
                        if (score <= 20) fillColor = "#ff0000";
                        else if (score <= 40) fillColor = "#ff9999";
                        else if (score <= 60) fillColor = "#ffcc66";
                        else if (score <= 80) fillColor = "#66cc66";
                        else fillColor = "#5799ff";
                        return <rect {...props} fill={fillColor} />;
                      }}
                      label={{ position: "top" }}
                    />
                  </BarChart>
                  <p className="weight-status">
                    몸무게 관리 방법 : {selectedWeightManagementTip}
                  </p>
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
                      {healthLabels[key]}: {finalScores[key]}점 <br />
                      {getHealthStatus(finalScores[key])}
                      <div className="detail-description">
                        {healthDescriptions[key][
                          getHealthStatus(finalScores[key])
                        ] || "상세 정보가 없습니다."}
                      </div>
                    </div>
                  ))}
                  <div className="color-squares">
                    <div
                      className="square"
                      style={{ backgroundColor: "#ff0000", color: "white" }}
                    >
                      매우 위험
                    </div>
                    <div
                      className="square"
                      style={{ backgroundColor: "#ff9999", color: "white" }}
                    >
                      위험
                    </div>
                    <div
                      className="square"
                      style={{ backgroundColor: "#ffcc66", color: "white" }}
                    >
                      주의
                    </div>
                    <div
                      className="square"
                      style={{ backgroundColor: "#66cc66", color: "white" }}
                    >
                      양호
                    </div>
                    <div
                      className="square"
                      style={{ backgroundColor: "#5799ff", color: "white" }}
                    >
                      건강
                    </div>
                  </div>
                  <div style={{ margin: "0 auto" }}>
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      매우 위험이나 위험이 나왔으면 꼭 가까운 동물 병원에 바로
                      연락해보세요!
                    </span>
                    <br />
                    <button className="map-search-btn">
                      <Link to="/service/allMap" style={{ color: "#5799ff" }}>
                        {" "}
                        -주변 동물병원 검색하기-
                      </Link>
                    </button>
                  </div>

                  <br />
                </div>
                <div className="lastBtn-box">
                  <button className="ps-btn2" onClick={onClickDownloadButton}>
                    사진으로 저장하기
                  </button>
                  {isLogin ? (
                    <div>
                      <button className="saveResult-btn" onClick={saveStatus}>
                        검사기록 저장하기
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthTest;
