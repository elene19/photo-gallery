import { createContext, useContext, useEffect, useState } from "react";

import useDebounce from "./hooks/useDebounce";
import { photoSearch } from "./service/apiPhotoGallery";
import { useInfiniteQuery } from "@tanstack/react-query";

const PhotoContext = createContext();
// eslint-disable-next-line react/prop-types
export default function PhotoProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const debouncedQuery = useDebounce(query, 600);

  const {
    data: fetchedData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["photos", { debouncedQuery }],
    queryFn: async ({ pageParam = 1 }) => {
      if (debouncedQuery.length > 1) {
        try {
          const data = await photoSearch(debouncedQuery, pageParam);

          return data;
        } catch (error) {
          setError(error);
        }
      }
      return [];
    },
    getNextPageParam: (lastPage) => {
      const totalPages = lastPage.total_pages;
      const currentPage = 1;

      if (currentPage < totalPages) {
        return currentPage + page;
      }
    },
  });

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      setHistory((prev) => {
        if (prev.includes(debouncedQuery)) return prev;
        return [...prev, debouncedQuery];
      });
    }
    if (debouncedQuery.length === 0) {
      setPage(1);
    }
  }, [debouncedQuery]);

  function handleClick(e) {
    setId(e.target.id);
  }

  return (
    <PhotoContext.Provider
      value={{
        fetchedData,
        setQuery,
        query,
        history,
        debouncedQuery,
        setLoading,
        loading,
        setPage,
        isFetching,
        fetchNextPage,
        hasNextPage,
        handleClick,
        id,
        setId,
        page,
        setError,
        error,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
}

export function usePhotos() {
  const context = useContext(PhotoContext);
  if (context === undefined) throw new Error("used outside provider");
  return context;
}
