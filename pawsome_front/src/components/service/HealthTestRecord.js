import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Link } from "react-router-dom"; // Link 임포트
import html2canvas from "html2canvas";
import Swal from "sweetalert2";

// 필요한 헬퍼 함수 정의
const getHealthStatus = (score) => {
  if (score <= 20) return "매우 위험";
  if (score <= 40) return "위험";
  if (score <= 60) return "주의";
  if (score <= 80) return "양호";
  return "건강";
};

const getHealthStatusColor = (status) => {
  switch (status) {
    case "매우 위험":
      return "#ff0000";
    case "위험":
      return "#ff9999";
    case "주의":
      return "#ffcc66";
    case "양호":
      return "#66cc66";
    case "건강":
      return "#5799ff";
    default:
      return "#ffffff"; // 기본 색상
  }
};

const HealthTestRecord = () => {
  const [sessionPets, setSessionPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [memberEmail] = useRecoilState(loginEmailState);
  const [petSelectComplete, setPetSelectComplete] = useState(false);
  const [formData, setFormData] = useState({
    no: "",
    name: "",
  });
  const [data, setData] = useState([]); // 데이터 상태 추가
  const [finalScores, setFinalScores] = useState({}); // 최종 점수 상태 추가
  const [healthLabels, setHealthLabels] = useState({}); // 건강 라벨 상태 추가
  const [healthDescriptions, setHealthDescriptions] = useState({}); // 건강 설명 상태 추가
  const [selectedWeightManagementTip, setSelectedWeightManagementTip] =
    useState(""); // 몸무게 관리 팁 상태 추가

  const petDataSelection = (pet) => {
    setPetSelectComplete(true);
    setSelectedPet(pet.petName);
    setFormData({
      name: pet.name,
      no: pet.petNo,
    });
    // 여기에 데이터와 점수를 가져오는 로직 추가
    fetchPetHealthData(pet.petNo);
  };
  useEffect(() => {
    axios
      .get(`${backServer}/pet/petList/${memberEmail}`)
      .then((res) => {
        setSessionPets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backServer]);
  const fetchPetHealthData = async (petNo) => {
    try {
      const response = await axios.get(`${backServer}/pet/health/${petNo}`);
      setData(response.data.data); // 그래프 데이터
      setFinalScores(response.data.finalScores);
      setHealthLabels(response.data.healthLabels);
      setHealthDescriptions(response.data.healthDescriptions);
      setSelectedWeightManagementTip(response.data.weightManagementTip);
    } catch (error) {
      console.error("Error fetching pet health data:", error);
    }
  };

  useEffect(() => {
    const fetchSessionPets = async () => {
      try {
        const response = await axios.get(
          `${backServer}/pet/petList/${memberEmail}`
        );
        setSessionPets(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSessionPets();
  }, [backServer, memberEmail]);

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
    <div className="HT-container">
      {!petSelectComplete ? (
        <div>
          <p style={{ fontSize: "x-large", fontWeight: "bold" }}>
            기록을 확인할 반려동물을 선택해주세요!
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
        </div>
      ) : (
        <div>
          <div className="result-box" id="result">
            <h1>{selectedPet}의 건강테스트 결과</h1>
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
                  {healthDescriptions[key][getHealthStatus(finalScores[key])] ||
                    "상세 정보가 없습니다."}
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
            <div>
              <span>
                매우 위험이나 위험이 나왔으면 꼭 가까운 동물 병원에 바로
                연락해보세요!
              </span>
              <Link to="/service/allMap"> -주변 동물병원 검색하기-</Link>
            </div>
            <p className="weight-status">
              몸무게 관리 방법: {selectedWeightManagementTip}
            </p>
            <br />
          </div>
          <button className="ps-btn2" onClick={onClickDownloadButton}>
            앨범에 저장
          </button>
        </div>
      )}
    </div>
  );
};

export default HealthTestRecord;
