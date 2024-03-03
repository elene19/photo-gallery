import {
  useCallback,
  useEffect,
  // useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePhotos } from "../ContextProvider";
import Image from "./Image";
import { getPopularPhotos } from "../service/apiPhotoGallery";
import Loader from "../ui/Loader";

function Container() {
  const [populars, setPopulars] = useState([]);
  const containerRef = useRef();
  containerRef;

  const {
    debouncedQuery,
    fetchedData,
    isLoading,
    setLoading,
    loading,
    isFetching,
    setPage,
    handleClick,
    fetchNextPage,
    hasNextPage,
    setError,
    error,
  } = usePhotos();

  const observer = useRef();

  const results = fetchedData?.pages.map((e) => e.results);

  const lastImgElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
            setPage((prev) => prev + 1);
            console.log("at the bottom");
          }
        },
        { threshold: 1 }
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, fetchNextPage, hasNextPage, setPage]
  );

  useEffect(() => {
    async function fetchPopularPhotos() {
      try {
        if (debouncedQuery.length === 0) {
          setLoading(true);
          const popularPhotos = await getPopularPhotos();
          setPopulars(popularPhotos);
          setLoading(false);
        }
      } catch (error) {
        setError(error);
      }
    }
    fetchPopularPhotos();
  }, [debouncedQuery.length, setLoading, setError]);

  if (loading || isLoading || isFetching) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <div className="container" ref={containerRef}>
      {results[0] !== undefined
        ? results.map((e, i) =>
            e.map((e, index) => {
              if (results.length === i + 1 && index === 9) {
                return (
                  <Image
                    id={e.id}
                    ref={lastImgElementRef}
                    src={e.urls.small}
                    key={e.id}
                    alt={e.alt_description}
                    onClick={handleClick}
                  />
                );
              } else {
                return (
                  <Image
                    id={e.id}
                    src={e.urls.small}
                    key={e.id}
                    alt={e.alt_description}
                    onClick={handleClick}
                  />
                );
              }
            })
          )
        : populars.map((e) => (
            <Image
              id={e.id}
              src={e.urls.small}
              key={e.id}
              alt={e.alt_description}
              onClick={handleClick}
            />
          ))}
      {results[0]?.length === 0 && (
        <>
          <div className="not-found">
            <i className="fa-solid fa-x"></i>

            {`No results with '${debouncedQuery}'`}
          </div>
        </>
      )}
    </div>
  );
}

export default Container;
