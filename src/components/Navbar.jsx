import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.js";

export default function Navbar({ authed = false }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="navbar bg-white shadow-sm border-b border-sky-100 px-4">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-sky-700">
          📘 Study Management
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2 items-center">
          {authed ? (
            <>
              <li>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-sm btn-sky">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li>
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-sm btn-sky">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
