import { useState } from "react";
import { usePhotos } from "../ContextProvider";
// import Container from "./Container";
import styles from "./HistoryContainer.module.css";
import Container from "./Container";

function HistoryContainer() {
  const [clickedBtn, setClickedBtn] = useState(false);
  const { history, setQuery, query, debouncedQuery } = usePhotos();

  function handleClick(query) {
    setQuery(query);
    setClickedBtn(true);
  }
  history;
  query;
  // if (history.length > 0) return <div>g</div>;
  return (
    <div className={styles.container}>
      <h1>{history.length > 0 ? "Your History" : "No search history.."}</h1>

      <div className={styles.listBox}>
        {history.map((e, i) => (
          <button onClick={() => handleClick(e)} key={i}>
            {e}
          </button>
        ))}

        {debouncedQuery.length > 0 && clickedBtn ? <Container /> : null}
      </div>
    </div>
  );
}

export default HistoryContainer;
