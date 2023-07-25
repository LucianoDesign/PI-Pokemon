/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = (props) => {
  const { id, name, image, type } = props;
  
 

  return (
    <Link to={`detail/${id}`} className="Link">
    <div className={styles.divCardContainer}>
        <h4>{name}</h4>
      <img src={image} alt={name} />
      <div>
        <h5>Type:</h5>
        <ul className={styles.typesFont}>
          {type.map((pokemonType, index) => (
            <li key={index}>{pokemonType}</li>
            ))}
        </ul>
      </div>
        {id.length > 10 ? <button className={styles.deleteCreated}>delete</button> : null}
    </div>
    </Link>
  );
};

export default Card;
