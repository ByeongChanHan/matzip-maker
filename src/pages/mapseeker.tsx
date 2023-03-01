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

    return () => {
      kakao.maps.event.removeListener(map, "idle");
    };
  }, [mapRef]);

  return (
    <div>
      <div className={styles.map} ref={mapRef}></div>
    </div>
  );
}
