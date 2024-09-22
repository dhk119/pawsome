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
  }, []);
};

export default Map;
