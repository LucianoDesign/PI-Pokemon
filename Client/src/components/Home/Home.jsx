import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadPokemons, loadPokemonTypes } from "../../redux/actions";
import Pagination from "../Pagination/Pagination";
import RenderPokemons from "../RenderPokemons/renderPokemons";
import FilterByType from "../FilterByType/FilterByType";

import SearchBar from "../searchBar/searchBar";
import SortByProperty from "../SortByProperty/SortByProperty";

import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPokemons());
    dispatch(loadPokemonTypes());
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
