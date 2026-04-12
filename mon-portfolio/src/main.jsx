import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.jsx";
import ReactDOM from "react-dom/client";
import "./index.css";
//import { LangProvider } from "./context/LangContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);