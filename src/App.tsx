import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
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
            element={state.token ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!state.token ? <SignupPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!state.token ? <LoginPage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
