import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validateName, validateImage, validateStats } from "./validations";
import { postPokemon } from "../../redux/actions";
import styles from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const pokemonTypes = useSelector((state) => state.types);
  const [imageUrl, setImageUrl] = useState("");
  const [pokemonData, setPokemonData] = useState({
    name: "",
    image: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: "",
  });

  const handleChange = async (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setPokemonData((prevData) => ({
      ...prevData,
      [property]: value,
    }));

    if (property === "name") {
      setErrors({ ...errors, name: validateName(value) });
    }
    if (property === "image") {
      try {
        await validateImage(value);
        setErrors({ ...errors, image: "" });
      } catch (error) {
        setErrors({ ...errors, image: error });
      }
      setImageUrl(value);
    }
    // Define an object to map properties to validation functions
    const propertyValidationMap = {
      hp: validateStats,
      attack: validateStats,
      defense: validateStats,
      speed: validateStats,
      height: validateStats,
      weight: validateStats,
    };

    // Check if the property exists in the validation map and update errors accordingly
    if (property in propertyValidationMap) {
      setErrors({
        ...errors,
        [property]: propertyValidationMap[property](value, property),
      });
    }
  };

  const handleTypeChange = (e) => {
    const { name, value } = e.target;
  
    // Actualizar solo el tipo 1
    if (name === "type1") {
      setPokemonData((prevData) => ({
        ...prevData,
        types: [value, prevData.types[1]],
      }));
    }
  
    // Actualizar solo el tipo 2
    if (name === "type2") {
      setPokemonData((prevData) => ({
        ...prevData,
        types: [prevData.types[0], value],
      }));
    }
  
    // Manejar la opción de dejar un botón vacío
    if (name === "type1" && value === "") {
      setPokemonData((prevData) => ({
        ...prevData,
        types: [undefined, prevData.types[1]],
      }));
    }
  
    if (name === "type2" && value === "") {
      setPokemonData((prevData) => ({
        ...prevData,
        types: [prevData.types[0], undefined],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emptyField = Object.values(pokemonData).some((data) => data === "");
    if (emptyField) {
      window.alert("All fields must be completed");
      return;
    }
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      window.alert("Wrong data, try again");
      return;
    }
    dispatch(postPokemon(pokemonData));
    window.alert("pokemon created");
  };

  return (
    <div className={styles.FormBox}>
      <h2>Create a new Pokemon</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            value={pokemonData.name}
            onChange={handleChange}
          />
          <span>{errors.name}</span>
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            id="image"
            name="image"
            value={pokemonData.image}
            onChange={handleChange}
          />
          {errors.image && <span className="error">{errors.image}</span>}
        </div>
        <div>
          <label htmlFor="hp">hp:</label>
          <input
            id="hp"
            name="hp"
            value={pokemonData.hp}
            onChange={handleChange}
          />
          <span>{errors.hp}</span>
        </div>
        <div>
          <label htmlFor="attack">Attack:</label>
          <input
            id="attack"
            name="attack"
            value={pokemonData.attack}
            onChange={handleChange}
          />
          <span>{errors.attack}</span>
        </div>
        <div>
          <label htmlFor="defense">Defense:</label>
          <input
            id="defense"
            name="defense"
            value={pokemonData.defense}
            onChange={handleChange}
          />
          <span>{errors.defense}</span>
        </div>
        <div>
          <label htmlFor="speed">Speed:</label>
          <input
            id="speed"
            name="speed"
            value={pokemonData.speed}
            onChange={handleChange}
          />
          <span>{errors.speed}</span>
        </div>
        <div>
          <label htmlFor="height">Height:</label>
          <input
            id="height"
            name="height"
            value={pokemonData.height}
            onChange={handleChange}
          />
          <span>{errors.height}</span>
        </div>
        <div>
          <label htmlFor="weight">Weight:</label>
          <input
            id="weight"
            name="weight"
            value={pokemonData.weight}
            onChange={handleChange}
          />
          <span>{errors.weight}</span>
        </div>
        <div>
          <label htmlFor="types">Type 1:</label>
          <select
            id="type1"
            name="type1"
            value={pokemonData.types[0]}
            onChange={handleTypeChange}
          >
            <option value="">Select a type</option>
            {pokemonTypes.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
          <label htmlFor="types">Type 2:</label>
          <select
            id="type2"
            name="type2"
            value={pokemonData.types[1]}
            onChange={handleTypeChange}
          >
            <option value="">Select a type</option>
            {pokemonTypes.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Pokemon</button>
      </form>
      <div className={styles.uploadedImg}>
        {imageUrl && <img src={imageUrl} alt="Pokemon" />}
      </div>
    </div>
  );
};

export default Form;
