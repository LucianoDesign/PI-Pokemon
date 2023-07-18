import styles from "./Home.module.css";
/* *********************  HOOKS  *********************** */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
/* *********************  ACTIONS *********************** */
import { loadPokemons, loadPokemonTypes } from "../../redux/actions";
/* *********************  COMPONENTS  *********************** */
import Pagination from "../Pagination/Pagination";
import RenderPokemons from "../RenderPokemons/RenderPokemons";
import FilterByType from "../FilterByType/FilterByType";
import SearchBar from "../SearchBar/SearchBar";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.divHomeContent}>
      <SearchBar />
      <SortByProperty />
      <div className={styles.screenContent}>
        <div className={styles.divTypeContent}>
          <FilterByType />
        </div>
        <div className={styles.divRenderPoke}>
          <Pagination />
          <RenderPokemons />
        </div>
      </div>
    </div>
  );
};

export default Home;
