import { useEffect } from "react";

const WalkMap = () => {
  useEffect(() => {
    const { kakao } = window;
    const container = document.getElementById("walkMap");
    const options = {
      center: new kakao.maps.LatLng(37.534309284563484, 126.89705830370033),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);

    var drawingFlag = false;
    var moveLine;
    var clickLine;
    var distanceOverlay;
    var dots = [];

    // 현재 위치 확인 및 마커 표시
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const locPosition = new kakao.maps.LatLng(lat, lon);
        const message = '<div style="padding:5px;">여기에 계신가요?</div>';

        displayMarker(locPosition, message);
        map.setCenter(locPosition);
      });
    } else {
      const locPosition = new kakao.maps.LatLng(
        37.534309284563484,
        126.89705830370033
      );
      const message = "위치를 알 수 없어요..";
      displayMarker(locPosition, message);
    }

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      var clickPosition = mouseEvent.latLng;

      if (!drawingFlag) {
        drawingFlag = true;
        deleteClickLine();
        deleteDistnce();
        deleteCircleDot();

        clickLine = new kakao.maps.Polyline({
          map: map,
          path: [clickPosition],
          strokeWeight: 3,
          strokeColor: "RED",
          strokeOpacity: 1,
          strokeStyle: "solid",
        });

        moveLine = new kakao.maps.Polyline({
          strokeWeight: 3,
          strokeColor: "RED",
          strokeOpacity: 0.5,
          strokeStyle: "solid",
        });

        displayCircleDot(clickPosition, 0);
      } else {
        var path = clickLine.getPath();
        path.push(clickPosition);
        clickLine.setPath(path);

        var distance = Math.round(clickLine.getLength());
        displayCircleDot(clickPosition, distance);
      }
    });

    kakao.maps.event.addListener(map, "mousemove", function (mouseEvent) {
      if (drawingFlag) {
        var mousePosition = mouseEvent.latLng;
        var path = clickLine.getPath();
        var movepath = [path[path.length - 1], mousePosition];
        moveLine.setPath(movepath);
        moveLine.setMap(map);

        var distance = Math.round(clickLine.getLength() + moveLine.getLength());
        var content =
          '<div class="dotOverlay distanceInfo">총거리 <span class="number">' +
          distance +
          "</span>m</div>";
        showDistance(content, mousePosition);
      }
    });

    kakao.maps.event.addListener(map, "rightclick", function () {
      if (drawingFlag) {
        moveLine.setMap(null);
        moveLine = null;

        var path = clickLine.getPath();
        if (path.length > 1) {
          var distance = Math.round(clickLine.getLength());
          var content = getTimeHTML(distance);
          showDistance(content, path[path.length - 1]);
        } else {
          deleteClickLine();
          deleteCircleDot();
          deleteDistnce();
        }
        drawingFlag = false;
      }
    });

    // Helper functions
    function deleteClickLine() {
      if (clickLine) {
        clickLine.setMap(null);
        clickLine = null;
      }
    }

    function showDistance(content, position) {
      if (distanceOverlay) {
        distanceOverlay.setPosition(position);
        distanceOverlay.setContent(content);
      } else {
        distanceOverlay = new kakao.maps.CustomOverlay({
          map: map,
          content: content,
          position: position,
          xAnchor: 0,
          yAnchor: 0,
          zIndex: 3,
        });
      }
    }

    function deleteDistnce() {
      if (distanceOverlay) {
        distanceOverlay.setMap(null);
        distanceOverlay = null;
      }
    }

    function displayCircleDot(position, distance) {
      var circleOverlay = new kakao.maps.CustomOverlay({
        content: '<span class="dot"></span>',
        position: position,
        zIndex: 1,
      });

      circleOverlay.setMap(map);

      if (distance > 0) {
        var distanceOverlay = new kakao.maps.CustomOverlay({
          content:
            '<div class="distance-box">거리 <span class="number">' +
            distance +
            "</span>m</div>",
          position: position,
          yAnchor: 1,
          zIndex: 2,
        });

        distanceOverlay.setMap(map);
      }

      dots.push({ circle: circleOverlay, distance: distanceOverlay });
    }

    function deleteCircleDot() {
      for (var i = 0; i < dots.length; i++) {
        if (dots[i].circle) {
          dots[i].circle.setMap(null);
        }

        if (dots[i].distance) {
          dots[i].distance.setMap(null);
        }
      }
      dots = [];
    }

    function getTimeHTML(distance) {
      var walkTime = (distance / 67) | 0;
      var walkHour = "",
        walkMin = "";

      if (walkTime > 60) {
        walkHour =
          '<span class="number">' + Math.floor(walkTime / 60) + "</span>시간 ";
      }
      walkMin = '<span class="number">' + (walkTime % 60) + "</span>분";

      var bicycleTime = (distance / 227) | 0;
      var bicycleHour = "",
        bicycleMin = "";

      if (bicycleTime > 60) {
        bicycleHour =
          '<span class="number">' +
          Math.floor(bicycleTime / 60) +
          "</span>시간 ";
      }
      bicycleMin = '<span class="number">' + (bicycleTime % 60) + "</span>분";

      var content = '<ul class="distance-box">';
      content +=
        '    <li><span class="label">총거리</span><span class="number" >' +
        distance +
        "</span>m</li>";
      content +=
        '    <li><span class="label">도보</span>' +
        walkHour +
        walkMin +
        "</li>";
      content +=
        '    <li><span class="label">자전거</span>' +
        bicycleHour +
        bicycleMin +
        "</li>";
      content += "</ul>";

      return content;
    }

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition, message) {
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      var iwContent = message,
        iwRemoveable = true;

      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      infowindow.open(map, marker);
    }
  }, []);

  return <div id="walkMap" style={{ width: "500px", height: "400px" }}></div>;
};

export default WalkMap;
