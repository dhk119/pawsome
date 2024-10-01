import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Map = () => {
  const [keyword, setKeyword] = useState("당산 동물병원");
  const keywordInputRef = useRef(null);

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

    const searchPlaces = (keywordInput) => {
      if (!keywordInput) {
        keywordInput = keywordInputRef.current.value; // 검색어 입력창에서 키워드 가져오기
      }

      if (!keywordInput.replace(/^\s+|\s+$/g, "")) {
        alert("키워드를 입력해주세요!");
        return false;
      }

      ps.keywordSearch(keywordInput, placesSearchCB);
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
        itemStr += " <span>" + place.address_name + "</span>";
      }

      itemStr +=
        "<br /><span class='tel'>" +
        (place.phone || "전화번호 없음") +
        "</span>" +
        "</div><hr />";

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

    // 검색 버튼 클릭 이벤트
    document
      .getElementById("searchButton")
      .addEventListener("click", () => searchPlaces());

    // 엔터 키 이벤트
    keywordInputRef.current.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchPlaces();
      }
    });

    // 페이지 로드 시 기본 검색
    searchPlaces(keyword);
  }, [keyword]);

  const searchClick = (searchTerm) => {
    setKeyword(searchTerm); // 상태 업데이트
  };

  return (
    <div
      id="map-box"
      style={{ position: "relative", textAlign: "center", color: "#FFA518" }}
    >
      <nav className="nav-box">
        <ul>
          <li className="nav-btn">
            <Link to="#" onClick={() => searchClick("서울 동물병원")}>
              동물병원
            </Link>
          </li>
          <li className="nav-btn">
            <Link to="#" onClick={() => searchClick("서울 애견용품")}>
              애견용품
            </Link>
          </li>
          <li className="nav-btn">
            <Link to="#" onClick={() => searchClick("서울 애견호텔")}>
              애견호텔
            </Link>
          </li>
          <li className="nav-btn">
            <Link to="#" onClick={() => searchClick("서울 공원")}>
              산책공원
            </Link>
          </li>
        </ul>
      </nav>
      <h3>
        검색하실때 주변 지하철역이나 **동,**구를 이용해 검색해주세요. "예)당산
        동물병원, 영등포구 동물병원"
      </h3>
      <div id="map">
        <div id="menu_wrap">
          <input
            type="text"
            id="keyword"
            ref={keywordInputRef} // ref 추가
            placeholder="검색어를 입력하세요"
          />
          <button id="searchButton">검색</button>
          <ul id="placesList" style={{}}></ul>
          <div id="pagination"></div>
        </div>
      </div>
    </div>
  );
};

export default Map;
