import { useEffect, useState } from "react";
import styles from "./ModalWindow.module.css";
import { usePhotos } from "../ContextProvider";
import { getSinglePhoto } from "../service/apiPhotoGallery";

function ModalWindow() {
  const { id, setId, setError } = usePhotos();
  const [open, setOpen] = useState(false);
  const [{ alt_description, downloads, likes, views, urls }, setPhoto] =
    useState([]);

  useEffect(() => {
    async function fetchOnePhoto() {
      try {
        const data = await getSinglePhoto(id);

        setPhoto(data);
        if (id.length > 0) setOpen(true);
      } catch (error) {
        setError(error);
      }
    }
    fetchOnePhoto();
  }, [id, setError]);

  function handleClose() {
    setOpen(false);
    setId("");
  }

  return (
    <>
      {open && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={handleClose}>
              &times;
            </span>
            <img src={urls.small} alt={alt_description} />
            <div className={styles.information}>
              <div>
                <i className="fa-solid fa-heart">: {likes}</i>
                <p></p>
              </div>
              <div>
                <i className="fa-solid fa-eye">: {views}</i>
                <p></p>
              </div>
              <div>
                <i className="fa-solid fa-download">: {downloads}</i>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalWindow;
