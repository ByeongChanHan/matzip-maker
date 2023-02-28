import styles from "../styles/section.module.scss";

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
          <img src={restaurant.image} alt={restaurant.name} />
          <h3>{restaurant.name}</h3>
          <p>{restaurant.description}</p>
          <div className={styles.rating}>{restaurant.rating}</div>
        </div>
      ))}
    </section>
  );
}
