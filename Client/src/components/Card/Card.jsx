import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = (props) => {
  const { id, name, image, type } = props;

  return (
    <div className={styles.divCardContainer}>
      <Link to={`detail/${id}`} className="Link">
        <h4>{name}</h4>
      </Link>
      <img src={image} alt={name} />
      <div>
        <h5>Type:</h5>
        <ul className={styles.typesFont}>
          {type.map((pokemonType, index) => (
            <li key={index}>{pokemonType}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
