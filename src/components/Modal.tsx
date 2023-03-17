import React, { ReactNode, useState } from "react";
import styles from "../styles/Modal.module.scss";
import FileUploader from "./FileUploader";
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const [place, setPlace] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");
  const [rating, setRating] = useState(1);
  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCategories([value]);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(e.target.value)); // 문자열을 숫자로 변환하여 업데이트
  };

  //추가 버튼
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("place:", place);
    console.log("categories:", categories);
    console.log("keyword:", keyword);
  };

  if (!isOpen) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.content}>
          <form onSubmit={handleSubmit}>
            <label>
              장소
              <input
                type="text"
                value={place}
                onChange={handlePlaceChange}
                placeholder="장소를 입력하세요."
              />
            </label>
            <label>
              이미지
              <FileUploader />
            </label>
            <label>
              카테고리
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="한식"
                    checked={categories.includes("한식")}
                    onChange={handleCategoryChange}
                  />
                  한식
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="중식"
                    checked={categories.includes("중식")}
                    onChange={handleCategoryChange}
                  />
                  중식
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="일식"
                    checked={categories.includes("일식")}
                    onChange={handleCategoryChange}
                  />
                  일식
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="양식"
                    checked={categories.includes("양식")}
                    onChange={handleCategoryChange}
                  />
                  양식
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="분식"
                    checked={categories.includes("분식")}
                    onChange={handleCategoryChange}
                  />
                  분식
                </label>
              </div>
            </label>
            <label>
              검색 키워드
              <input
                type="text"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="검색에 사용할 키워드를 입력하세요."
              />
            </label>
            <label>
              평점
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={handleRatingChange}
                placeholder="1 ~ 5점 중에서 입력하세요."
              />
            </label>
            <button type="submit">추가</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
