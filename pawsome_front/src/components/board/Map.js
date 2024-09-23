import { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    const { kakao } = window;
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.534309284563484, 126.89705830370033),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const locPosition = new kakao.maps.LatLng(lat, lon);
          const message = '<div style="padding:5px;">여기에 계신가요?</div>';

          // 마커와 인포윈도우를 표시합니다
          displayMarker(locPosition, message, map);
        },
        function () {
          // 위치를 얻지 못했을 경우
          const locPosition = new kakao.maps.LatLng(
            37.534309284563484,
            126.89705830370033
          );
          const message = "위치정보를 사용할 수 없어요..";
          displayMarker(locPosition, message, map);
        }
      );
    } else {
      const locPosition = new kakao.maps.LatLng(
        37.534309284563484,
        126.89705830370033
      );
      const message = "위치정보를 사용할 수 없어요..";
      displayMarker(locPosition, message, map);
    }

    function displayMarker(locPosition, message, map) {
      // 마커를 생성
      const marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      const iwContent = message;
      const iwRemoveable = true;

      const infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      infowindow.open(map, marker);

      // 지도 중심좌표를 접속 위치로 변경합니다
      map.setCenter(locPosition);
    }
  }, []);

  return (
    <div
      id="map-box"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div id="map" style={{ width: "1200px", height: "600px" }} />;
    </div>
  );
};

export default Map;
