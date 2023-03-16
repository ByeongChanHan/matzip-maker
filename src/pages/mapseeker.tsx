/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Kakaomap, {
  getAddressByCoords,
  placesSearchCB,
  removeMarkers,
} from "@/util/Kakaomap";
import { useEffect } from "react";
import styles from "../styles/mapseeker.module.scss";

export default function mapseeker() {
  //현위치에서 찾기
  const onHandleClick = async () => {
    removeMarkers();
    const lat = localStorage.getItem("latitude");
    const lon = localStorage.getItem("longitude");
    const locPosition = new window.kakao.maps.LatLng(lat, lon);
    const address = await getAddressByCoords(locPosition);
    let places = new window.kakao.maps.services.Places();
    places!.keywordSearch(address, placesSearchCB); // 현재 위치 맛집 검색
  };

  useEffect(() => {
    localStorage.clear();
    Kakaomap();
  });

  return (
    <div>
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.heading}>내 주변 맛집</h2>
          <p className={styles.description}>
            지도를 이용하여 맛집을 찾아보세요!
          </p>
        </div>
      </section>
      <div id="map"></div>
      <button className={styles.reset} onClick={onHandleClick}>
        현 위치에서 찾기
      </button>
      <style jsx global>{`
        #map {
          width: 100vw;
          height: 70vh;
        }
        .map_label {
          position: relative;
          font-family: "Noto Sans KR", sans-serif;
          font-weight: bolder;
          text-align: center;
          height: 115px;
          position: relative;
          font-size: 15px;
          padding: 5px 20px;
          box-sizing: border-box;
          border-radius: 15px;
          background: #fff;
          border: 0;
          box-shadow: 0px 0px 10px #000;
        }
        .map_label_arrow {
          border: 0px solid transparent;
          border-bottom: 10px solid rgba(0, 0, 0, 0);
          position: relative;
        }

        .map_label_arrow::after {
          border: 16px solid transparent;
          border-top: 16px solid #fff;
          content: "";
          position: absolute;
          right: 45%;
        }

        .place_name {
          font-size: 17px;
          color: #cb9639;
          font-weight: bolder;
        }
        .category_name {
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
}
