import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PostsContextProvider } from "./context/PostContext.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { UsersContextProvider } from "./context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostsContextProvider>
        <UsersContextProvider>
          <App />
        </UsersContextProvider>
      </PostsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
