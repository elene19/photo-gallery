import { RouterProvider, createBrowserRouter } from "react-router-dom";
import History from "./pages/History";
import Homepage from "./pages/Homepage"; // {loader as  homepageLoader}
import AppLayout from "./ui/AppLayout";
import PhotoProvider from "./ContextProvider";
// import PhotoProvider from "./ContextProvider";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
        // loader: homepageLoader,
      },
      {
        path: "/history",
        element: <History />,
      },
    ],
  },
]);

function App() {
  return (
    <PhotoProvider>
      <RouterProvider router={router} />
    </PhotoProvider>
  );
}

export default App;
