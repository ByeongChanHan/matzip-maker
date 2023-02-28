import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <header>
      <nav className={styles.navigation}>
        <b>Matzip Maker</b>
        <ul>
          <li>
            <a href="#">지도</a>
          </li>
          <li>
            <a href="#">맛집 리스트</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
