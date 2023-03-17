import React from "react";
import styles from "../styles/NewRestaurantButton.module.scss";

type Props = {
  onClick: () => void;
};

const NewRestaurantButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div className={styles.addButtonContainer}>
      <button className={styles.button} onClick={onClick}>
        <span className={styles.text}>새로운 맛집 추가하기</span>
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 4a1 1 0 00-1 1v4H5a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V5a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default NewRestaurantButton;
