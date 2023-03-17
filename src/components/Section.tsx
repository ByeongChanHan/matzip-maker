import styles from "../styles/section.module.scss";
import Image from "next/image";
import restaurants from "../json/restaurants.json";
import NewRestaurantButton from "./NewRestaurantButton";
import { useState } from "react";
import Modal from "../components/Modal";

export default function Section() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewRestaurantClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <p className={styles.title}>맛집 리스트</p>
      <section className={styles.mainsection}>
        {restaurants.map((restaurant) => (
          <div key={restaurant.name} className={styles.card}>
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              width={500}
              height={300}
            />
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
            <div className={styles.rating}>
              <div
                className={styles.stars}
                data-rating={Math.round(restaurant.rating)}
                aria-label={`Rating of this restaurant is ${restaurant.rating} out of 5.`}
              ></div>
              <span>{restaurant.rating.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </section>
      <NewRestaurantButton onClick={handleNewRestaurantClick} />
      {isModalOpen && (
        <Modal onClose={handleModalClose} isOpen={isModalOpen}>
          <p>모달창 내용</p>
        </Modal>
      )}
    </>
  );
}
