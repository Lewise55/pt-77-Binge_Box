import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Global styles for your application
import { RouterProvider } from "react-router-dom"; // Import RouterProvider to use the router
import { router } from "./routes"; // Import the router configuration
import { StoreProvider } from "./hooks/useGlobalReducer"; // Import the StoreProvider for global state management
import { BackendURL } from "./components/BackendURL";
import "bootstrap/dist/css/bootstrap.min.css"; // For styles
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // For dropdowns and popovers (includes Popper)
import ReactPullToRefresh from "react-pull-to-refresh";
import { useState, useEffect } from "react";

const Main = () => {

  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (refresh > 0)
    console.log("refresh triggered", refresh);
  }, [refresh]);

  const handleRefresh = () => {
    return new Promise((resolve) => {
      setRefresh((n) => n+1);
      resolve();
    });
  };

  if (
    !import.meta.env.VITE_BACKEND_URL ||
    import.meta.env.VITE_BACKEND_URL == ""
  )
    return (
      <React.StrictMode>
        <BackendURL />
      </React.StrictMode>
    );
  return (
    <ReactPullToRefresh onRefresh={handleRefresh} style={{ height: "100vh", overflow: "auto" }}>
      <React.StrictMode key={refresh}>
        {/* Provide global state to all components */}
        <StoreProvider>
          {/* Set up routing for the application */}
          <RouterProvider router={router}></RouterProvider>
        </StoreProvider>
      </React.StrictMode>
    </ReactPullToRefresh>
  );
};

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
