import React, { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    if (!window.kakao) {
      const script = document.createElement("script");
      script.async = true;
      script.onload = initMap; // 스크립트 로드 후 지도 초기화
      document.head.appendChild(script);
    } else {
      initMap(); // 이미 로드된 경우 바로 지도 초기화
    }
  }, []);

  const initMap = () => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(
        37.53424395470808,
        126.89704990790277
      ), // 중심 좌표
      level: 5, // 확대/축소 레벨
    };

    new window.kakao.maps.Map(container, options); // 지도 생성
  };

  return <div id="map" style={{ width: "500px", height: "400px" }}></div>;
};

export default Map;
