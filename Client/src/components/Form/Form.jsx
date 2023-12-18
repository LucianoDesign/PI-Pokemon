import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validateName, validateImage, validateStats } from "./validations";
import { postPokemon } from "../../redux/actions";
import StatBar from "../StatBar/StatBar";
import styles from "./Form.module.css";
import sword2 from "../../assets/sword2.svg";
import heart2 from "../../assets/heart2.svg";
import shield2 from "../../assets/shield2.svg";
import thunder2 from "../../assets/thunder2.svg";

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

    const propertyValidationMap = {
      hp: validateStats,
      attack: validateStats,
      defense: validateStats,
      speed: validateStats,
      height: validateStats,
      weight: validateStats,
    };

    if (property in propertyValidationMap) {
      setErrors({
        ...errors,
        [property]: propertyValidationMap[property](value, property),
      });
    }
  };

  const handleTypeChange = (e) => {
    const { name, value } = e.target;

    /* Obtain types */
    const [type1, type2] = pokemonData.types;

    /* update types based on type value */
    let updatedTypes;
    if (name === "type1") {
      updatedTypes = [value, type2];
    } else if (name === "type2") {
      updatedTypes = [type1, value];
    }

    /* update types only if one of them are selected or none is selected */

    if (type1 || type2 || value !== "") {
      setPokemonData((prevData) => ({
        ...prevData,
        types: updatedTypes,
      }));
    }
  };
  const hasErrors = Object.values(errors).some((error) => error !== "");
  const emptyField = Object.values(pokemonData).some(
    (data) => data === "" || data === 0
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    /* If some field is empty returns a window alert */
    const hasType1 =
      pokemonData.types[0] === "" || pokemonData.types[0] === undefined;
    const hasType2 =
      pokemonData.types[1] === "" || pokemonData.types[1] === undefined;
    if (hasType1 && hasType2) {
      window.alert("Please select at least one Pokémon type.");
      return;
    }

    if (emptyField) {
      window.alert("All fields must be completed");
      return;
    }

    if (hasErrors) {
      window.alert("Wrong data, try again");
      return;
    }
    dispatch(
      postPokemon({
        ...pokemonData,
        name: pokemonData.name.toLowerCase().trim(),
      })
    );
  };

  return (
    <div className={styles.crt}>
      <div className={styles.formContainer}>
        <div className={styles.formTitle}>
          <h2>Create a new Pokemon</h2>
        </div>

        <div className={styles.FormBox}>
          <form
            onSubmit={handleSubmit}
            id="pokemonForm"
            className={styles.pokemonForm}
          >
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                name="name"
                value={pokemonData.name}
                onChange={handleChange}
              />
              <p>{errors.name}</p>
            </div>
            <div>
              <label htmlFor="image">Image:</label>
              <input
                id="image"
                name="image"
                value={pokemonData.image}
                placeholder="insert Url..."
                onChange={handleChange}
              />
              {errors.image && <p className="error">{errors.image}</p>}
            </div>
            <div>
              <label htmlFor="hp">hp:</label>
              <input
                id="hp"
                name="hp"
                type="number"
                value={pokemonData.hp}
                onChange={handleChange}
              />
              <p>{errors.hp}</p>
            </div>
            <div>
              <label htmlFor="attack">Attack:</label>
              <input
                id="attack"
                type="number"
                name="attack"
                value={pokemonData.attack}
                onChange={handleChange}
              />
              <p>{errors.attack}</p>
            </div>
            <div>
              <label htmlFor="defense">Defense:</label>
              <input
                id="defense"
                type="number"
                name="defense"
                value={pokemonData.defense}
                onChange={handleChange}
              />
              <p>{errors.defense}</p>
            </div>
            <div>
              <label htmlFor="speed">Speed:</label>
              <input
                id="speed"
                type="number"
                name="speed"
                value={pokemonData.speed}
                onChange={handleChange}
              />
              <p>{errors.speed}</p>
            </div>
            <div>
              <label htmlFor="height">Height:</label>
              <input
                id="height"
                name="height"
                value={pokemonData.height}
                onChange={handleChange}
              />
              <p>{errors.height}</p>
            </div>
            <div>
              <label htmlFor="weight">Weight:</label>
              <input
                id="weight"
                name="weight"
                value={pokemonData.weight}
                onChange={handleChange}
              />
              <p>{errors.weight}</p>
            </div>
            <div className={styles.typesDiv}>
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
          </form>
        </div>
        <div className={styles.statsDivContainer}>
          <div className={styles.uploadedImg}>
            {imageUrl && <img src={imageUrl} alt="Pokemon" />}
          </div>
          <div className={styles.statDiv}>
            <img src={heart2} alt="hp" className={styles.iconStat} />
            <StatBar
              statValue={pokemonData.hp}
              maxValue={255}
              barColors={["#ff0000", "#ff9999"]}
            />
          </div>
          <div className={styles.statDiv}>
            <img src={sword2} alt="attack" className={styles.iconStat} />
            <StatBar
              statValue={pokemonData.attack}
              maxValue={200}
              barColors={["#00ff00", "#99ff99"]}
            />
          </div>
          <div className={styles.statDiv}>
            <img src={shield2} alt="defense" className={styles.iconStat} />
            <StatBar
              statValue={pokemonData.defense}
              maxValue={250}
              barColors={["#0000ff", "#9999ff"]}
            />
          </div>
          <div className={styles.statDiv}>
            <img src={thunder2} alt="attack" className={styles.iconStat} />
            <StatBar
              statValue={pokemonData.speed}
              maxValue={190}
              barColors={["#ffff00", "#ffff99"]}
            />
          </div>

          <button
            className={styles.submitButton}
            type="submit"
            form="pokemonForm"
            disabled={hasErrors || emptyField}
          >
            Create Pokemon
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
