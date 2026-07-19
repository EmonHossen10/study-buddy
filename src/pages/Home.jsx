import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  const features = [
    {
      icon: "📝",
      title: "Create Study Tasks",
      desc: "Add subjects, topics, dates and durations in seconds.",
    },
    {
      icon: "📊",
      title: "Track Progress",
      desc: "See total and completed tasks at a glance.",
    },
    {
      icon: "🔒",
      title: "Private & Secure",
      desc: "Each user sees only their own tasks via Supabase RLS.",
    },
    {
      icon: "⚡",
      title: "Simple & Fast",
      desc: "Beginner-friendly design built with React and DaisyUI.",
    },
  ];

  const steps = [
    { n: "1", t: "Register", d: "Create your free account." },
    { n: "2", t: "Add Tasks", d: "Plan your study subjects and topics." },
    { n: "3", t: "Track", d: "Update status and stay on track daily." },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="hero py-16 px-4">
        <div className="hero-content flex-col lg:flex-row gap-10 max-w-6xl">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-sky-800">
              Plan Your Study, Track Your Progress
            </h1>
            <p className="py-6 text-sky-900/80">
              A simple study management system to create, view, update and
              manage your daily study tasks — all in one place.
            </p>
            <div className="flex gap-3">
              <Link to="/register" className="btn btn-sky">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-sky-outline">
                Login
              </Link>
            </div>
          </div>
          <div className="card w-80 bg-white shadow-xl border border-sky-100">
            <div className="card-body">
              <h2 className="card-title text-sky-700">Today's Study</h2>
              <p className="font-semibold">Database Systems</p>
              <p>Topic: SQL & Database Design</p>
              <div>
                Status:{" "}
                <span className="badge bg-sky-500 text-white border-none">
                  In Progress
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-14 px-4 border-y border-sky-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-sky-800 mb-2">
            Why Use Study Management?
          </h2>
          <p className="text-center text-sky-900/70 mb-10">
            Everything you need to stay organized as a student.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="card bg-sky-50 border border-sky-100 shadow-sm"
              >
                <div className="card-body items-center text-center">
                  <div className="text-4xl">{f.icon}</div>
                  <h3 className="card-title text-sky-800 text-lg">{f.title}</h3>
                  <p className="text-sm text-sky-900/70">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-sky-800 mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div
                key={s.n}
                className="card bg-white border border-sky-100 shadow-sm"
              >
                <div className="card-body">
                  <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold">
                    {s.n}
                  </div>
                  <h3 className="card-title text-sky-800">{s.t}</h3>
                  <p className="text-sky-900/70 text-sm">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto text-center bg-sky-600 text-white rounded-2xl p-10 shadow-lg">
          <h2 className="text-3xl font-bold mb-3">
            Ready to organize your study?
          </h2>
          <p className="mb-6 text-sky-50">
            Create your free account and start tracking today.
          </p>
          <Link
            to="/register"
            className="btn bg-white text-sky-700 hover:bg-sky-100 border-none"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
