import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="hero min-h-[calc(100vh-4rem)]">
        <div className="hero-content flex-col lg:flex-row gap-10">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Plan Your Study, Track Your Progress
            </h1>
            <p className="py-6">
              A simple study management system to create, view, update and
              manage your daily study tasks.
            </p>
            <div className="flex gap-3">
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
            </div>
          </div>
          <div className="card w-80 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Today's Study</h2>
              <p className="font-semibold">Database Systems</p>
              <p>Topic: SQL & Database Design</p>
              <div>
                Status: <span className="badge badge-warning">In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
