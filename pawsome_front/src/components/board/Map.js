import React, { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    const { kakao } = window;

    var markers = [];
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(37.534309284563484, 126.89705830370033),
      level: 3,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    const ps = new kakao.maps.services.Places();
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const searchPlaces = () => {
      const keywordInput = document.getElementById("keyword");
      if (!keywordInput) {
        console.error("검색어 입력 요소가 없습니다.");
        return;
      }

      var keyword = keywordInput.value;

      if (!keyword.replace(/^\s+|\s+$/g, "")) {
        alert("키워드를 입력해주세요!");
        return false;
      }

      ps.keywordSearch(keyword, placesSearchCB);
    };

    const placesSearchCB = (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        displayPlaces(data);
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    };

    const displayPlaces = (places) => {
      const listEl = document.getElementById("placesList");
      const menuEl = document.getElementById("menu_wrap");
      const fragment = document.createDocumentFragment();
      const bounds = new kakao.maps.LatLngBounds();

      removeAllChildNods(listEl);
      removeMarker();

      for (var i = 0; i < places.length; i++) {
        const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
        const marker = addMarker(placePosition, i, places[i]);
        const itemEl = getListItem(i, places[i]);

        bounds.extend(placePosition);

        (function (marker, place) {
          kakao.maps.event.addListener(marker, "mouseover", function () {
            displayInfowindow(marker, place);
          });

          kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });

          itemEl.onmouseover = function () {
            displayInfowindow(marker, place);
          };

          itemEl.onmouseout = function () {
            infowindow.close();
          };
        })(marker, places[i]);

        fragment.appendChild(itemEl);
      }

      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;
      map.setBounds(bounds);
    };

    const getListItem = (index, place) => {
      var el = document.createElement("li");
      var itemStr =
        '<span class="markerbg marker_' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        "   <h5>" +
        place.place_name +
        "</h5>";

      if (place.road_address_name) {
        itemStr +=
          "    <span>" +
          place.road_address_name +
          "</span>" +
          "   <span class='jibun gray'>" +
          place.address_name +
          "</span>";
      } else {
        itemStr += "    <span>" + place.address_name + "</span>";
      }

      itemStr +=
        "  <span class='tel'>" +
        (place.phone || "전화번호 없음") +
        "</span>" +
        "</div>";

      el.innerHTML = itemStr;
      el.className = "item";

      return el;
    };

    const addMarker = (position, idx) => {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png",
        imageSize = new kakao.maps.Size(36, 37),
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691),
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
          offset: new kakao.maps.Point(13, 37),
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position,
          image: markerImage,
        });

      marker.setMap(map);
      markers.push(marker);

      return marker;
    };

    const removeMarker = () => {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    };

    const displayPagination = (pagination) => {
      var paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    };

    const displayInfowindow = (marker, place) => {
      var content =
        '<div style="padding:5px;z-index:1;">' +
        "<strong>" +
        place.place_name +
        "</strong><br>" +
        (place.road_address_name ? place.road_address_name + "<br>" : "") +
        (place.phone ? "전화번호: " + place.phone : "전화번호 없음") +
        "</div>";

      infowindow.setContent(content);
      infowindow.open(map, marker);
    };

    const removeAllChildNods = (el) => {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    };

    document
      .getElementById("searchBtn")
      .addEventListener("click", searchPlaces);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div
        id="map"
        style={{
          margin: "0 auto",
          width: "1200px",
          height: "600px",
        }}
      />
      <div
        id="menu_wrap"
        style={{
          margin: "0 auto",
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "white",
          padding: "10px",
          zIndex: 100,
        }}
      >
        <input type="text" id="keyword" placeholder="검색어를 입력하세요" />
        <button id="searchBtn">검색</button>
        <ul
          id="placesList"
          style={{
            margin: "0 auto",
            listStyleType: "none",
            maxHeight: "300px",
            overflowY: "auto",
          }}
        ></ul>
        <div id="pagination"></div>
      </div>
    </div>
  );
};

export default Map;
