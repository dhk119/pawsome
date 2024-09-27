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

    const searchPlaces = (keyword) => {
      const keywordInput = document.getElementById("keyword");
      if (!keywordInput) {
        console.error("검색어 입력 요소가 없습니다.");
        return;
      }

      // 키워드가 주어지면 해당 키워드로 검색
      if (!keyword) {
        keyword = keywordInput.value; // 검색어 입력창에서 키워드 가져오기
      }

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

    document
      .getElementById("searchButton")
      .addEventListener("click", () => searchPlaces());

    // 검색 입력 후 엔터 키 이벤트
    document.getElementById("keyword").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchPlaces();
      }
    });

    // 페이지 로드 시 "당산 동물병원"으로 검색
    searchPlaces("당산 동물병원");
  }, []);

  return (
    <div
      id="map-box"
      style={{ position: "relative", textAlign: "center", color: "#FFA518" }}
    >
      <h3>
        검색하실때 주변 지하철역이나 **동,**구를 이용해 검색해주세요. "예)당산
        동물병원, 영등포구 동물병원"
      </h3>

      <div
        id="map"
        style={{
          margin: "0 auto",
          width: "1400px",
          height: "700px",
        }}
      >
        <div
          id="menu_wrap"
          style={{
            background: "rgba(255, 255, 255, 0.85)", // 투명도 약간 높임
            borderRadius: "10px",
            color: "black",
            textAlign: "left",
            margin: "0 auto",
            position: "absolute",
            top: "10px",
            left: "10px",
            padding: "10px",
            zIndex: 100,
          }}
        >
          <input
            type="text"
            id="keyword"
            placeholder="검색어를 입력하세요"
            style={{
              width: "85%",
              padding: "5px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "3px solid #ffa518",
            }}
          />
          <button
            id="searchButton"
            style={{
              marginLeft: "5px",
              marginBottom: "10px",
              width: "10%",
              height: "30px",
              background: "#ffa518",
              border: "20px",
              fontWeight: "border",
              color: "white",
            }}
          >
            검색
          </button>
          <ul
            id="placesList"
            style={{
              border: "2px solid #ffa518",
              margin: "0 auto",
              listStyleType: "none",
              maxHeight: "500px",
              overflowY: "auto", // 스크롤 가능하게
              padding: "0",
              borderRadius: "5px",
            }}
          ></ul>
          <div
            id="pagination"
            style={{
              textAlign: "center", // 가운데 정렬
              marginTop: "10px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Map;
