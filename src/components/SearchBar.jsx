// import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
// import useDebounce from "../hooks/useDebounce";
// import { photoSearch } from "../service/apiPhotoGallery";
import { usePhotos } from "../ContextProvider";

function SearchBar() {
  const { query, setQuery } = usePhotos();
  // console.log(query);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div className={styles.searchBox}>
      <p className={styles.header}>Photo Search</p>
      <input type="text" value={query} onChange={handleChange} />
    </div>
  );
}

export default SearchBar;
