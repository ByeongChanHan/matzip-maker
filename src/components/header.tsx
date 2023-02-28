import styles from "../styles/header.module.scss";
import Link from "next/link";
export default function header() {
  return (
    <header>
      <nav className={styles.navigation}>
        <b onClick={moveHome}>Matzip Maker</b>
        <ul>
          <li>
            <Link href="/mapseeker">지도</Link>
          </li>
          <li>
            <Link href="/list">맛집 리스트</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
const moveHome = () => {
  window.location.href = "/";
};
