import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import styles from "./Detail.module.css";
import StatBar from "../StatBar/StatBar";

const Detail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`${id}`);
        const { data } = response;
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }
  
  return (
    <div className={styles.crt}>
    <div className={styles.detailContent}>
      <div className={styles.detailImageDiv}>
        <img src={pokemon.image} alt={pokemon.name} className={styles.detailImage}/>
      </div>
      <div className={styles.detailStats}>
        <h1>{pokemon.name}</h1>
        {/* Resto de los datos del Pokémon */}
        <p>HP: {pokemon.hp}</p>
        <StatBar statValue={pokemon.hp} maxValue={255} />

        <p>Speed: {pokemon.speed}</p>
        <StatBar statValue={pokemon.speed} maxValue={180} />

        <p>Attack: {pokemon.attack}</p>
        <StatBar statValue={pokemon.attack} maxValue={190} />

        <p>Defense: {pokemon.defense}</p>
        <StatBar statValue={pokemon.defense} maxValue={250} />

        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <h4>Type:</h4>
        <ul>
          {pokemon.type.map((pokemonType, index) => (
            <li key={index}>{pokemonType}</li>
          ))}
        </ul>
      </div>
    </div>

    </div>
  );
};

export default Detail;