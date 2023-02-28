import styles from "../styles/header.module.scss";
import Link from "next/link";

export default function Header() {
  const moveHome = () => {
    window.location.href = "/";
  };

  return (
    <header>
      <nav className={styles.navigation}>
        <b onClick={moveHome}>Matzip Maker</b>
        <ul>
          <li>
            <Link href="/login">로그인</Link>
          </li>
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
