import { useState } from "react";
import styles from "../styles/login.module.scss";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 로그인 요청 등의 작업 수행
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Matzip Maker</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          <input
            className={styles.input}
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="아이디"
          />
        </label>
        <br />
        <label className={styles.label}>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
          />
        </label>
        <br />
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
