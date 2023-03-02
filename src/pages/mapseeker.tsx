/* eslint-disable react-hooks/rules-of-hooks */
/*global kakao*/
import { useEffect, useRef } from "react";
import styles from "../styles/mapseeker.module.scss";

export default function mapseeker() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const kakao = (window as any).kakao;
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.978),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    // 주소-좌표 변환 객체를 생성합니다
    let geocoder = new kakao.maps.services.Geocoder();
    // 장소 검색 객체를 생성합니다
    let places = new kakao.maps.services.Places();
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data: string | any[], status: any) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          displayPlace(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }
    // 지도에 마커를 표시하는 함수입니다
    function displayPlace(place: { y: any; x: any; place_name: string }) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="line-height : 30px;">' + place.place_name + "</div>"
        );
        infowindow.open(map, marker);
      });
    }

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude; // 위도
        let lon = position.coords.longitude; // 경도
        let locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        let message =
          '<div style="position: relative; line-height : 30px; left: 50%;">현재 위치</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
        geocoder.coord2Address(
          locPosition.getLng(),
          locPosition.getLat(),
          (result: { address: any }[], status: any) => {
            if (status === kakao.maps.services.Status.OK) {
              const searchKeyword =
                result[0].address.region_1depth_name +
                " " +
                result[0].address.region_2depth_name +
                " " +
                result[0].address.region_3depth_name +
                " " +
                "맛집";
              places.keywordSearch(searchKeyword, placesSearchCB);
            }
          }
        );
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "위치를 찾을 수 없어요";

      displayMarker(locPosition, message);
    }

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition: any, message?: string) {
      // 마커를 생성합니다
      let marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      let iwContent = message; // 인포윈도우에 표시할 내용
      let iwRemoveable = false;

      // 인포윈도우를 생성합니다
      let infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }

    return () => {
      kakao.maps.event.removeListener(map, "idle");
    };
  }, [mapRef]);

  return (
    <div>
      <section>
        <h2 className={styles.h2}>내 주변 맛집</h2>
      </section>
      <div className={styles.map} ref={mapRef}></div>
    </div>
  );
}
