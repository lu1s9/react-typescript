import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
  const { logout } = useLogout();

  const { state } = useAuthContext();
  const handleClick = () => {
    logout();
  };

  return (
    <header className="text-gray-700 bg-white">
      <div className="max-w-7xl mx-auto px-10 py-4 flex items-center justify-between">
        <Link to="/" className="text-gray-700  no-underline">
          <h1 className="text-3xl font-extrabold">Social Network</h1>
        </Link>
        <nav className="flex items-center">
          {state.user && (
            <div>
              <span>{state.user.name}</span>
              <Link to="friendsList" className="ml-3">
                Friends List
              </Link>
              <button
                onClick={handleClick}
                className="text-green-500 bg-white border-solid border-green-500 border-2 rounded cursor-pointer text-base py-2 px-3"
              >
                Log out
              </button>
            </div>
          )}

          {!state.user && (
            <div>
              <Link to="/login" className="ml-3">
                Log in
              </Link>
              <Link to="/signup" className="ml-3">
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
