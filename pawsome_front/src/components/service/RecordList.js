import { Link } from "react-router-dom";
import React, { useState } from "react";

const RecordList = () => {
  const [ownerName, setOwnerName] = useState("");
  const [ownerBirth, setOwnerBirth] = useState("");
  const [rfidCode, setRfidCode] = useState("");
  const [dogRegNo, setDogRegNo] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const fetchAnimalInfo = async () => {
    // 최소 하나의 조건을 만족하는지 확인
    const isOwnerInputValid = ownerName || ownerBirth;
    const isAnimalInputValid = rfidCode || dogRegNo;

    if (!isOwnerInputValid || !isAnimalInputValid) {
      setError(
        "이름 또는 생년월일과 동물 등록 번호 또는 RFID 코드를 입력하세요."
      );
      return;
    }

    const url = "http://apis.data.go.kr/1543061/animalInfoSrvc/animalInfo";
    const queryParams =
      `?serviceKey=jsZCz0OGXZhMZy5zCGJsDuwg8TF0k1DPK%2Bzxhu8gR36oqJz8qsxSNCI2XDcTuh8h%2BPxtDX5PtG2dVCIcFjZC0g%3D%3D` +
      `&owner_nm=${encodeURIComponent(ownerName)}` +
      `&owner_birth=${encodeURIComponent(ownerBirth)}` +
      `&rfid_cd=${encodeURIComponent(rfidCode)}` +
      `&dog_reg_no=${encodeURIComponent(dogRegNo)}`;

    console.log("Fetching data from:", url + queryParams);
    try {
      const response = await fetch(url + queryParams);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const text = await response.text();
      console.log("API Response:", text);

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");

      const resultCode =
        xmlDoc.getElementsByTagName("resultCode")[0]?.textContent || "Unknown";
      const resultMsg =
        xmlDoc.getElementsByTagName("resultMsg")[0]?.textContent ||
        "No message";

      console.log("Result Code:", resultCode);
      console.log("Result Message:", resultMsg);

      if (resultCode === "00") {
        const item = xmlDoc.getElementsByTagName("item")[0];
        if (item) {
          const dogRegNo =
            item.getElementsByTagName("dogRegNo")[0]?.textContent ||
            "No registration number";
          const dogNm =
            item.getElementsByTagName("dogNm")[0]?.textContent || "No dog name";
          const sexNm =
            item.getElementsByTagName("sexNm")[0]?.textContent || "No sex info";
          const kindNm =
            item.getElementsByTagName("kindNm")[0]?.textContent ||
            "No breed info";
          const neuterYn =
            item.getElementsByTagName("neuterYn")[0]?.textContent ||
            "No neuter info";
          const orgNm =
            item.getElementsByTagName("orgNm")[0]?.textContent ||
            "No organization";
          const officeTel =
            item.getElementsByTagName("officeTel")[0]?.textContent ||
            "No contact number";

          setResult({
            reqNo:
              xmlDoc.getElementsByTagName("reqNo")[0]?.textContent ||
              "No request number",
            resultMsg,
            dogRegNo,
            dogNm,
            sexNm,
            kindNm,
            neuterYn,
            orgNm,
            officeTel,
          });
        } else {
          setError("No item found in the response.");
        }
      } else {
        setError(resultMsg);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>반려동물 정보 조회</h1>
      <div>
        <label>
          이름:
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
        </label>
        <br />
        <label>
          생년월일:
          <input
            type="text"
            value={ownerBirth}
            onChange={(e) => setOwnerBirth(e.target.value)}
          />
        </label>
        <br />
        <label>
          RFID 코드:
          <input
            type="text"
            value={rfidCode}
            onChange={(e) => setRfidCode(e.target.value)}
          />
        </label>
        <br />
        <label>
          동물 등록 번호:
          <input
            type="text"
            value={dogRegNo}
            onChange={(e) => setDogRegNo(e.target.value)}
          />
        </label>
        <br />
        <button onClick={fetchAnimalInfo}>정보 조회</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div>
          <h2>조회 결과:</h2>
          <p>요청 번호: {result.reqNo}</p>
          <p>결과 메시지: {result.resultMsg}</p>
          <p>동물 등록 번호: {result.dogRegNo}</p>
          <p>개 이름: {result.dogNm}</p>
          <p>성별: {result.sexNm}</p>
          <p>품종: {result.kindNm}</p>
          <p>중성화 여부: {result.neuterYn}</p>
          <p>관할 기관: {result.orgNm}</p>
          <p>연락처: {result.officeTel}</p>
        </div>
      )}
    </div>
  );
};

export default RecordList;
