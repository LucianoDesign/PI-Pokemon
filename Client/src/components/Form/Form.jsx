import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Form = () => {

  const pokemonTypes = useSelector((state) => state.types);
  const [pokemonData, setPokemonData] = useState({
    name: '',
    image: '',
    life: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  });
  console.log(pokemonTypes)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPokemonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPokemonData((prevData) => ({
        ...prevData,
        types: [...prevData.types, value],
      }));
    } else {
      setPokemonData((prevData) => ({
        ...prevData,
        types: prevData.types.filter((type) => type !== value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica para enviar los datos del nuevo pokemon
    // a través de una acción de Redux, una solicitud HTTP, etc.
    console.log(pokemonData);
    // Aquí puedes realizar las validaciones necesarias antes de enviar los datos
    // por ejemplo, validar que los campos requeridos no estén vacíos, que los valores
    // sean numéricos, etc.
  };

  return (
    <div>
      <h2>Create a new Pokemon</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={pokemonData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="url"
            id="image"
            name="image"
            value={pokemonData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="life">Life:</label>
          <input
            type="number"
            id="life"
            name="life"
            value={pokemonData.life}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="attack">Attack:</label>
          <input
            type="number"
            id="attack"
            name="attack"
            value={pokemonData.attack}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="defense">Defense:</label>
          <input
            type="number"
            id="defense"
            name="defense"
            value={pokemonData.defense}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="speed">Speed:</label>
          <input
            type="number"
            id="speed"
            name="speed"
            value={pokemonData.speed}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="height">Height:</label>
          <input
            type="number"
            id="height"
            name="height"
            value={pokemonData.height}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="weight">Weight:</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={pokemonData.weight}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="types">Types:</label>
          {pokemonTypes.map((type)=>(

          <select
            id={type.name}
            name="types"
            value={pokemonData.types}
            onChange={handleTypeChange}
          >
            <option value={type.name}>{type.name}</option>
          </select>
          ))}
            
        </div>
        <button type="submit">Create Pokemon</button>
      </form>
    </div>
  );
};

export default Form;