import styles from "../styles/section.module.scss";
import Image from "next/image";

const restaurants = [
  {
    name: "Restaurant 1",
    image: "/images/restaurant1.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4.5,
  },
  {
    name: "Restaurant 2",
    image: "/images/restaurant2.jpg",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    rating: 3.9,
  },
  {
    name: "Restaurant 3",
    image: "/images/restaurant3.jpg",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    rating: 4.2,
  },
];

export default function Section() {
  return (
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
  );
}
