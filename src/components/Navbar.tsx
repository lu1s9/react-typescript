import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="text-gray-700 bg-white">
      <div className="max-w-7xl mx-auto px-10 py-14 flex items-center justify-between">
        <Link to="/" className="text-gray-700  no-underline">
          <h1>Social Network</h1>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
