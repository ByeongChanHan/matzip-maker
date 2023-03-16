declare global {
  interface Window {
    kakao: any;
  }
}
const markers: any[] = []; // 모든 마커를 담고있는 배열
let globalmap: any; // 맵
let currentOverlay: any = null; // 커스텀 오버레이

export default function Kakaomap() {
  const kakao = (window as any).kakao;

  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(37.5665, 126.978),
    level: 3,
  };

  const map = new kakao.maps.Map(container, options);
  globalmap = map;

  //현재 위치 마커 이미지
  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  const imageSize = new kakao.maps.Size(24, 35);
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  // 중앙 마커
  const centerimageSrc = "/images/placeholder.png";
  const centerimageSize = new kakao.maps.Size(20, 20);
  // 마커 이미지를 생성
  const centermarkerImage = new kakao.maps.MarkerImage(
    centerimageSrc,
    centerimageSize
  );
  let centerMarker = new kakao.maps.Marker({
    position: map.getCenter(),
    image: centermarkerImage,
  });
  centerMarker.setMap(map);

  // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 중심 마커의 위치를 center로 이동, 좌표는 localstorage에 저장
  kakao.maps.event.addListener(map, "center_changed", () => {
    centerMarker.setPosition(map.getCenter());
    localStorage.setItem("latitude", map.getCenter().Ma);
    localStorage.setItem("longitude", map.getCenter().La);
  });

  // 현재 위치 불러오는 함수
  if (navigator.geolocation) {
    // GeoLocation을 이용해서 접속 위치를 얻어오기
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude; // 위도
      let lon = position.coords.longitude; // 경도
      let locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

      displayMarker(locPosition);
      const address = await getAddressByCoords(locPosition);
      searchNearbyPlaces(address);
    });
  }

  // 지도에 현재 위치 마커표시
  const displayMarker = (locPosition: object) => {
    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
      map: map,
      position: locPosition,
      image: markerImage,
    });

    markers.push(marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);
  };
}

//좌표를 주소로 변환해주는 함수
export const getAddressByCoords = (coords: {
  getLng: () => any;
  getLat: () => any;
}) => {
  return new Promise((resolve, reject) => {
    // 주소-좌표 변환 객체를 생성합니다
    let geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(
      coords.getLng(),
      coords.getLat(),
      (
        result: {
          address: {
            address_name: string;
          };
        }[],
        status: any
      ) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const searchKeyword = result[0].address.address_name + " " + "맛집";
          resolve(searchKeyword);
        } else {
          reject(new Error("Failed to convert coordinates to address"));
        }
      }
    );
  });
};

//이모지 랜덤생성
const getRandomEmoji = () => {
  const emojis = [
    "😀",
    "😁",
    "😃",
    "😄",
    "😆",
    "😉",
    "😊",
    "😋",
    "😍",
    "😘",
    "🥰",
    "😙",
    "🙂",
    "🤗",
    "🤩",
    "🤭",
  ];

  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
};

//마커 전체 제거
export const removeMarkers = () => {
  markers.forEach((value) => {
    value.setMap(null);
  });
};

// 맛집 검색 완료 시 호출되는 콜백함수
const placesSearchCB = (data: string | any[], status: string) => {
  if (currentOverlay) {
    currentOverlay.setMap(null);
  }
  if (status === window.kakao.maps.services.Status.OK) {
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    let bounds = new window.kakao.maps.LatLngBounds();

    for (let i = 0; i < data.length; i++) {
      displayInformation(data[i]);
      bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
    }

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정
    globalmap.setBounds(bounds);
  }
};

// 마커 정보를 보여주는 함수
const displayInformation = (place: {
  phone: string;
  category_name: string;
  address_name: string;
  y: string;
  x: string;
  place_name: string;
}) => {
  let marker = new window.kakao.maps.Marker({
    map: globalmap,
    position: new window.kakao.maps.LatLng(place.y, place.x),
  });
  let CustomOverlay = new window.kakao.maps.CustomOverlay({
    map: globalmap,
    zIndex: 1,
    position: new window.kakao.maps.LatLng(place.y, place.x),
    yAnchor: 1.45,
  });
  markers.push(marker);
  // 모든 마커에 클릭이벤트를 등록
  window.kakao.maps.event.addListener(marker, "click", () => {
    if (currentOverlay) {
      currentOverlay.setMap(null);
    }
    // 마커를 클릭하면 장소명이 인포윈도우에 표출
    CustomOverlay.setContent(
      '<div class="map_label">' +
        '<div class="place_name">' +
        place.place_name +
        " " +
        getRandomEmoji() +
        "</div>" +
        "<hr>" +
        '<div class="category_name">' +
        "카테고리 : " +
        place.category_name +
        "</div>" +
        '<div class="address_name">' +
        "주소 : " +
        place.address_name +
        "</div>" +
        '<div class="phone">' +
        "전화번호 : " +
        place.phone +
        "</div>" +
        '<div class="map_label_arrow"></div>' +
        "</div>"
    );
    CustomOverlay.setMap(globalmap);
    currentOverlay = CustomOverlay;
  });
  // 커스텀 오버레이 제거
  window.kakao.maps.event.addListener(globalmap, "click", () => {
    if (currentOverlay) {
      currentOverlay.setMap(null);
    }
  });
};

export const searchNearbyPlaces = (address: unknown) => {
  let places = new window.kakao.maps.services.Places();
  places.keywordSearch(address, placesSearchCB); // 현재 위치 맛집 검색
};
