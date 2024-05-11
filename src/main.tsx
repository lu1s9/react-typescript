import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PostsContextProvider } from "./context/PostContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PostsContextProvider>
      <App />
    </PostsContextProvider>
  </React.StrictMode>
);
