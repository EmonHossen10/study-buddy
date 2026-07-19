export default function StudyCard({ task, onEdit, onDelete }) {
  const badge =
    task.status === "Completed"
      ? "badge-success"
      : task.status === "In Progress"
      ? "badge-warning"
      : "badge-info";

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="card-title">{task.subject}</h3>
            <p className="text-sm opacity-70">{task.topic}</p>
          </div>
          <span className={`badge ${badge}`}>{task.status}</span>
        </div>
        <div className="text-sm mt-2">
          <div>
            <b>Date:</b> {task.study_date}
          </div>
          <div>
            <b>Duration:</b> {task.duration_minutes} min
          </div>
          {task.notes && (
            <div>
              <b>Notes:</b> {task.notes}
            </div>
          )}
        </div>
        <div className="card-actions justify-end mt-2">
          <button className="btn btn-sm btn-outline" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button
            className="btn btn-sm btn-error"
            onClick={() => onDelete(task)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
