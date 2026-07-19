import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import StudyForm from "../components/StudyForm.jsx";
import StudyCard from "../components/StudyCard.jsx";
import {
  fetchStudyTasks,
  addStudyTask,
  updateStudyTask,
  deleteStudyTask,
} from "../lib/supabase.js";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchStudyTasks();
      setTasks(data);
      setError("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (values) => {
    if (editing) {
      await updateStudyTask(editing.id, values);
      setEditing(null);
    } else {
      await addStudyTask(values);
    }
    await load();
  };

  const handleDelete = async (task) => {
    if (!window.confirm("Delete this study task?")) return;
    await deleteStudyTask(task.id);
    await load();
  };

  const completed = tasks.filter((t) => t.status === "Completed").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const planned = tasks.filter((t) => t.status === "Planned").length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar authed />
      <div className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8">
        <div className="bg-sky-600 text-white rounded-2xl p-6 mb-6 shadow">
          <h1 className="text-3xl font-bold">My Study Dashboard</h1>
          <p className="text-sky-100 mt-1">
            Manage your study tasks and track your progress.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="card bg-white shadow border border-sky-100">
            <div className="card-body p-4">
              <div className="text-sm text-sky-700">Total</div>
              <div className="text-3xl font-bold text-sky-800">{tasks.length}</div>
            </div>
          </div>
          <div className="card bg-white shadow border border-sky-100">
            <div className="card-body p-4">
              <div className="text-sm text-sky-700">Planned</div>
              <div className="text-3xl font-bold text-sky-500">{planned}</div>
            </div>
          </div>
          <div className="card bg-white shadow border border-sky-100">
            <div className="card-body p-4">
              <div className="text-sm text-sky-700">In Progress</div>
              <div className="text-3xl font-bold text-amber-500">{inProgress}</div>
            </div>
          </div>
          <div className="card bg-white shadow border border-sky-100">
            <div className="card-body p-4">
              <div className="text-sm text-sky-700">Completed</div>
              <div className="text-3xl font-bold text-emerald-600">{completed}</div>
            </div>
          </div>
        </div>

        {error && <div className="alert alert-error mb-4">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <StudyForm
              onSubmit={handleSubmit}
              editingTask={editing}
              onCancel={() => setEditing(null)}
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-sky-800">My Study Tasks</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg text-sky-600"></span>
              </div>
            ) : tasks.length === 0 ? (
              <div className="card bg-white shadow border border-sky-100">
                <div className="card-body text-center opacity-60">
                  No study tasks yet. Add your first one!
                </div>
              </div>
            ) : (
              tasks.map((t) => (
                <StudyCard
                  key={t.id}
                  task={t}
                  onEdit={setEditing}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
