import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import Navbar from "../components/Navbar.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="flex justify-center items-center py-16 px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <h2 className="card-title justify-center">Login</h2>
            {error && <div className="alert alert-error text-sm">{error}</div>}
            <label className="form-control">
              <span className="label-text">Email</span>
              <input
                type="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="form-control">
              <span className="label-text">Password</span>
              <input
                type="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button className="btn btn-primary mt-2" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="text-sm text-center mt-2">
              No account?{" "}
              <Link to="/register" className="link link-primary">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
