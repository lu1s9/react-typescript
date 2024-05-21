import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import FriendsListPage from "./pages/FriendsListPage";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { state } = useAuthContext();
  return (
    <BrowserRouter>
      <Navbar />
      <div className="max-w-7xl mx-auto px-20">
        <Routes>
          <Route
            path="/"
            element={state.user ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!state.user ? <SignupPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!state.user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/friendsList"
            element={
              state.user ? <FriendsListPage /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
