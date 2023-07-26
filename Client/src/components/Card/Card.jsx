/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import styles from "./Card.module.css";
import { deleteCreatedPokemon } from "../../redux/actions";

const Card = (props) => {
  const { id, name, image, type } = props;
  const dispatch = useDispatch();
  
  const handleDelete = () => {
    dispatch(deleteCreatedPokemon(id));
  };

  return (
    <div className={styles.divCaseCreated}>
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
        
    </div>
    </Link>
    {id.length > 10 ? <button className={styles.deleteCreated} onClick={handleDelete}>delete</button> : null}
    </div>
  );
};

export default Card;
