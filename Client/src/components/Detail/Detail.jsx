import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {URL} from "../../redux/actions"



const Detail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; 

    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        const { data } = response;

        if (isMounted) {
          setPokemon(data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchPokemon();

    return () => {
      isMounted = false; 
    };
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }
  
  return (
    <div>
      <h1>Detail</h1>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>HP: {pokemon.hp}</h3>
      <h3>Speed: {pokemon.speed}</h3>
      <h3>Attack: {pokemon.attack}</h3>
      <h3>Defense {pokemon.defense}</h3>
      <h3>Height: {pokemon.height}</h3>
      <h3>Weight: {pokemon.weight}</h3>
      <h4>Type:</h4>
        <ul>
          {pokemon.type.map((pokemonType, index) => (
            <li key={index}>{pokemonType}</li>
          ))}
        </ul>
    </div>
  );
};

export default Detail;
