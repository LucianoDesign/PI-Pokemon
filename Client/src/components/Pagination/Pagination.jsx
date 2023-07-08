import styles from "./Pagination.module.css";
import { useSelector, useDispatch } from "react-redux";
import { changePage, resetpokemonByName } from "../../redux/actions";

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const totalPages = useSelector((state) => state.totalPages);
  const pokemonByName = useSelector((state) => state.pokemonByName)
  
  
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  

  const handlePageChange = (page) => {
    dispatch(changePage(page));
  };
  
  const handleReset = () => {
    dispatch(resetpokemonByName());
  };

  if (pokemonByName.length > 0) {
    return (
      <div className={styles.pagination}>
        <button onClick={handleReset}>Reset</button>
        
      </div>
    );
  }

  return (
    <div className={styles.pagination}>
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={page === currentPage ? styles.active : ""}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
