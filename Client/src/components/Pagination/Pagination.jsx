import styles from "./Pagination.module.css";
import { useSelector, useDispatch } from "react-redux";
import { changePage, resetpokemonByName } from "../../redux/actions";

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const totalPages = useSelector((state) => state.totalPages);
  const pokemonByName = useSelector((state) => state.pokemonByName);

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

  // Mostrar solo 5 botones de página al mismo tiempo
  const maxButtonsToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

  // Ajustar el rango si estamos cerca del principio o final
  if (endPage - startPage + 1 < maxButtonsToShow) {
    startPage = Math.max(1, endPage - maxButtonsToShow + 1);
  }

  return (
    <div className={styles.pagination}>
      {totalPages > maxButtonsToShow && startPage !== currentPage && (
        <button
          className={styles.buttonInactive}
          onClick={() => handlePageChange(1)}
        >
          {"<<"}
        </button>
      )}

      {totalPages > maxButtonsToShow && startPage !== currentPage && (
        <button
          className={styles.buttonInactive}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
      )}

      {Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      ).map((page) => (
        <button
          key={page}
          className={
            page === currentPage ? styles.buttonActive : styles.buttonInactive
          }
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      {totalPages > maxButtonsToShow && endPage !== currentPage && (
        <button
          className={styles.buttonInactive}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      )}

      {totalPages > maxButtonsToShow && endPage !== currentPage && (
        <button
          className={styles.buttonInactive}
          onClick={() => handlePageChange(totalPages)}
        >
          {">>"}
        </button>
      )}
    </div>
  );
};

export default Pagination;
