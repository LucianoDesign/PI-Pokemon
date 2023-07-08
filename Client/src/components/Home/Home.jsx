import styles from "./Home.module.css";
/* *********************  HOOKS  *********************** */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
/* *********************  ACTIONS *********************** */
import { loadPokemons, loadPokemonTypes } from "../../redux/actions";
/* *********************  COMPONENTS  *********************** */
import Pagination from "../Pagination/Pagination";
import RenderPokemons from "../RenderPokemons/renderPokemons";
import FilterByType from "../FilterByType/FilterByType";
import SearchBar from "../searchBar/searchBar";
import SortByProperty from "../SortByProperty/SortByProperty";


const Home = () => {
  const dispatch = useDispatch();
  const pokemonsLoaded = useSelector((state) => state.pokemons.length > 0);
  const pokemonTypesLoaded = useSelector((state) => state.types.length > 0);

  useEffect(() => {
    if (!pokemonsLoaded) {
      dispatch(loadPokemons());
    }
    if (!pokemonTypesLoaded) {
      dispatch(loadPokemonTypes());
    }
  }, []);

  return (
    <div>
      <div className={styles.divHomeContent}>
        <RenderPokemons />
      </div>
      <div className={styles.pagination}>
        <Pagination />
      </div>

      <SortByProperty />
      <SearchBar />

      <FilterByType />
    </div>
  );
};

export default Home;
