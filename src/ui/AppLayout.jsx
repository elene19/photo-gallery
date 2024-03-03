import { Outlet, useNavigation } from "react-router-dom";
import PageNav from "../components/PageNav";
import Loader from "./Loader";
import ModalWindow from "../components/ModalWindow";
// import SearchBar from "../components/SearchBar";
// import { useState } from "react";
// import { useEffect } from "react";
// import { usePhotos } from "../ContextProvider";

function AppLayout() {
  // const[loading,setLoading]= useState(false)
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PageNav />
          <ModalWindow />
          <main>
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
}

export default AppLayout;
