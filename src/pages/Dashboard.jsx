import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
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

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar authed />
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">My Study Dashboard</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="stats bg-base-100 shadow">
            <div className="stat">
              <div className="stat-title">Total Study Tasks</div>
              <div className="stat-value">{tasks.length}</div>
            </div>
          </div>
          <div className="stats bg-base-100 shadow">
            <div className="stat">
              <div className="stat-title">Completed Tasks</div>
              <div className="stat-value text-success">{completed}</div>
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
            <h2 className="text-xl font-semibold">My Study Tasks</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : tasks.length === 0 ? (
              <div className="card bg-base-100 shadow">
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
    </div>
  );
}
