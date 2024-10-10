import React, { useEffect, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { loginEmailState } from "../utils/RecoilData";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Link, useNavigate } from "react-router-dom";

const HealthTestRecord = () => {
  const [sessionPets, setSessionPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedPetNo, setSelectedPetNo] = useState(null);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [memberEmail] = useRecoilState(loginEmailState);
  const [petSelectComplete, setPetSelectComplete] = useState(false);
  const navigate = useNavigate();
  const [selectedWeightManagementTip, setSelectedWeightManagementTip] =
    useState("");
  const [finalScores, setFinalScores] = useState({
    skin: 0,
    dental: 0,
    bone: 0,
    eye: 0,
    heart: 0,
    immunity: 0,
  });

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
        "피부 상태가 매우 좋지 않으며 지금 당장 수의사와의 상담이나 치료가 필요합니다! 가까운 동물병원에 당장 방문하세요.",
      "위험 단계!":
        "피부 상태가 좋지 않습니다. 정기적인 검진이나 치료가 필요합니다. 가까운 동물병원에 방문해주세요.",
      "주의 단계!":
        "피부 상태가 조금 좋지 않습니다! 동물병원을 방문하거나 관리를 꾸준히 해주세요.",
      양호: "피부 상태가 양호합니다. 계속 관심을 가져주세요.",
      건강: "피부 상태가 아주 건강합니다!!",
    },
    dental: {
      "매우 위험 단계!":
        "치아 상태가 매우 좋지 않으며 지금 당장 수의사와의 상담이나 치료가 필요합니다! 가까운 동물병원에 당장 방문하세요.",
      "위험 단계!":
        "치아 상태가 좋지 않습니다. 정기적인 검진이나 치료가 필요합니다. 가까운 동물병원에 방문해주세요.",
      "주의 단계!":
        "치아 상태가 조금 좋지 않습니다! 동물병원을 방문하거나 관리를 꾸준히 해주세요.",
      양호: "치아 상태가 양호합니다. 계속 관심을 가져주세요.",
      건강: "치아 상태가 아주 건강합니다!!",
    },
    bone: {
      "매우 위험 단계!":
        "뼈가 매우 좋지 않으며 지금 당장 수의사와의 상담이나 치료가 필요합니다! 가까운 동물병원에 당장 방문하세요.",
      "위험 단계!":
        "뼈가 좋지 않습니다. 정기적인 검진이나 치료가 필요합니다. 가까운 동물병원에 방문해주세요.",
      "주의 단계!":
        "뼈가 조금 좋지 않습니다! 동물병원을 방문하거나 관리를 꾸준히 해주세요.",
      양호: "뼈가 양호합니다. 계속 관심을 가져주세요.",
      건강: "뼈가 아주 건강합니다!!",
    },
    eye: {
      "매우 위험 단계!":
        "눈이 매우 좋지 않으며 지금 당장 수의사와의 상담이나 치료가 필요합니다! 가까운 동물병원에 당장 방문하세요.",
      "위험 단계!":
        "눈 상태가 좋지 않습니다. 정기적인 검진이나 치료가 필요합니다. 가까운 동물병원에 방문해주세요.",
      "주의 단계!":
        "눈이 조금 좋지 않습니다! 동물병원을 방문하거나 관리를 꾸준히 해주세요.",
      양호: "눈이 양호합니다. 계속 관심을 가져주세요.",
      건강: "눈이 아주 건강합니다!!",
    },
    heart: {
      "매우 위험 단계!":
        "심장 상태가 매우 좋지 않으며 지금 당장 수의사와의 상담이나 치료가 필요합니다! 가까운 동물병원에 당장 방문하세요.",
      "위험 단계!":
        "심장 상태가 좋지 않습니다. 정기적인 검진이나 치료가 필요합니다. 가까운 동물병원에 방문해주세요.",
      "주의 단계!":
        "심장 상태가 조금 좋지 않습니다! 동물병원을 방문하거나 관리를 꾸준히 해주세요.",
      양호: "심장 상태가 양호합니다. 계속 관심을 가져주세요.",
      건강: "심장 상태가 아주 건강합니다!!",
    },
    immunity: {
      "매우 위험 단계!":
        "면역력이나 호흡기가 매우 좋지 않으며 지금 당장 수의사와의 상담이나 치료가 필요합니다! 가까운 동물병원에 당장 방문하세요.",
      "위험 단계!":
        "면역력이나 호흡기가 좋지 않습니다. 정기적인 검진이나 치료가 필요합니다. 가까운 동물병원에 방문해주세요.",
      "주의 단계!":
        "면역력이나 호흡기가 조금 좋지 않습니다! 안좋은곳을 파악하여 관리를 꾸준히 해주세요.",
      양호: "면역력이나 호흡기가 양호합니다. 계속 관리하세요.",
      건강: "면역력이나 호흡기가 아주 건강합니다!!",
    },
  };

  useEffect(() => {
    axios
      .get(`${backServer}/pet/petList/${memberEmail}`)
      .then((res) => {
        setSessionPets(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backServer, memberEmail]);

  useEffect(() => {
    if (selectedPetNo) {
      axios
        .get(`${backServer}/pet/healthResult/${selectedPetNo}`)
        .then((res) => {
          console.log(res.data);
          if (!res.data || Object.keys(res.data).length === 0) {
            // 기록이 없을 경우 알림 띄우기
            return Swal.fire({
              icon: "warning",
              title: "알림",
              text: "이 반려동물의 건강 기록이 없습니다. 먼저 검사를 진행해주세요!",
              confirmButtonColor: "#5799ff",
              confirmButtonText: "검사하기",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/service/healthTest");
              }
            });
          }
          const healthInfo = {
            skin: res.data.petSkinStatus,
            dental: res.data.petDentalStatus,
            bone: res.data.petBoneStatus,
            eye: res.data.petEyeStatus,
            heart: res.data.petHeartStatus,
            immunity: res.data.petImmunityStatus,
          };
          setSelectedWeightManagementTip(
            weightManagementTips[res.data.petWeightStatus]
          );
          setFinalScores(healthInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedPetNo]);

  const healthLabels = {
    skin: "피부",
    dental: "치아",
    bone: "뼈",
    eye: "눈",
    heart: "심장",
    immunity: "면역력",
  };

  const petDataSelection = (pet) => {
    setPetSelectComplete(true);
    setSelectedPet(pet.petName);
    setSelectedPetNo(pet.petNo);
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
  const weightManagementTips = {
    1: "체중이 약간 마른 상태입니다. 적절한 영양 공급과 함께 건강한 체중을 유지하세요.",
    2: "체중이 정상입니다. 꾸준한 운동과 균형 잡힌 식사를 유지하세요.",
    3: "체중이 약간 살찐 상태입니다. 다이어트를 고려해보세요.",
    4: "체중이 많이 살찐 상태입니다. 전문가의 도움을 받는 것이 좋습니다.",
  };
  const onClickDownloadButton = () => {
    const target = document.getElementById("result");
    if (!target) {
      return Swal.fire({
        icon: "error",
        title: "실패!",
        text: "사진 저장에 실패했습니다.",
      });
    }
    html2canvas(target).then((canvas) => {
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.href = canvas.toDataURL("image/png");
      link.download = "HealthResult.png";
      link.click();
      document.body.removeChild(link);
    });
  };
  const data = Object.keys(finalScores).map((key) => ({
    name: healthLabels[key],
    score: finalScores[key],
  }));
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

      <div>

        {!petSelectComplete ? (
          <div style={{ marginLeft: "20px" }}>
            <div>
              <p style={{ fontWeight: "bold", color: "#ffa518" }}>
                건강 결과 확인 할 반려동물을 선택하세요.
              </p>
              <select
                className="map-search-btn1"
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
            <div>
              <button className="map-search-btn1">
                <Link to="/service/healthTest" style={{ color: "#fff" }}>
                  기록이 없다면 먼저 테스트를 진행해주세요.
                </Link>
              </button>
            </div>
          </div>
        ) : (
          <div className="service-wrap">
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
                  domain={[20, 100]} // y축 범위
                  ticks={[15, 35, 55, 80, 105]} // y축에 표시할 점수
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
                    if (score <= 20) fillColor = "#ff0000"; // 매우 위험
                    else if (score <= 40) fillColor = "#ff9999"; // 위험
                    else if (score <= 60) fillColor = "#ffcc66"; // 주의
                    else if (score <= 80) fillColor = "#66cc66"; // 양호
                    else fillColor = "#5799ff"; // 건강
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
              <div>
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
            </div>
            <button className="ps-btn2" onClick={onClickDownloadButton}>
              사진으로 저장하기
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default HealthTestRecord;
