import { useEffect, useState } from "react";

const empty = {
  subject: "",
  topic: "",
  study_date: "",
  duration_minutes: 30,
  status: "Planned",
  notes: "",
};

export default function StudyForm({ onSubmit, editingTask, onCancel }) {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setForm({
        subject: editingTask.subject || "",
        topic: editingTask.topic || "",
        study_date: editingTask.study_date || "",
        duration_minutes: editingTask.duration_minutes || 30,
        status: editingTask.status || "Planned",
        notes: editingTask.notes || "",
      });
    } else {
      setForm(empty);
    }
  }, [editingTask]);

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        ...form,
        duration_minutes: parseInt(form.duration_minutes, 10) || 0,
      });
      if (!editingTask) setForm(empty);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow">
      <form className="card-body" onSubmit={handleSubmit}>
        <h2 className="card-title">
          {editingTask ? "Edit Study Task" : "Add Study Task"}
        </h2>
        <label className="form-control">
          <span className="label-text">Subject</span>
          <input
            name="subject"
            value={form.subject}
            onChange={change}
            required
            className="input input-bordered"
          />
        </label>
        <label className="form-control">
          <span className="label-text">Topic</span>
          <input
            name="topic"
            value={form.topic}
            onChange={change}
            required
            className="input input-bordered"
          />
        </label>
        <label className="form-control">
          <span className="label-text">Study Date</span>
          <input
            type="date"
            name="study_date"
            value={form.study_date}
            onChange={change}
            required
            className="input input-bordered"
          />
        </label>
        <label className="form-control">
          <span className="label-text">Duration (minutes)</span>
          <input
            type="number"
            name="duration_minutes"
            value={form.duration_minutes}
            onChange={change}
            required
            min="1"
            className="input input-bordered"
          />
        </label>
        <label className="form-control">
          <span className="label-text">Status</span>
          <select
            name="status"
            value={form.status}
            onChange={change}
            className="select select-bordered"
          >
            <option>Planned</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </label>
        <label className="form-control">
          <span className="label-text">Notes</span>
          <textarea
            name="notes"
            value={form.notes}
            onChange={change}
            className="textarea textarea-bordered"
          />
        </label>
        <div className="flex gap-2 mt-2">
          <button className="btn btn-primary flex-1" disabled={saving}>
            {saving ? "Saving..." : editingTask ? "Update" : "Add"}
          </button>
          {editingTask && (
            <button type="button" className="btn" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
