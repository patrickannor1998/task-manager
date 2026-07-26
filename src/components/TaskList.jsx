import { useState } from 'react';

export default function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask }) {
  const [editingId, setEditingId] = useState(null);
  const [draftText, setDraftText] = useState('');

  const startEditing = (task) => {
    setEditingId(task.id);
    setDraftText(task.text);
  };

  const saveEditing = (taskId) => {
    if (!draftText.trim()) return;

    onEditTask(taskId, draftText.trim());
    setEditingId(null);
    setDraftText('');
  };

  return (
    <ul className="task-list" aria-label="Task list">
      {tasks.map((task) => (
        <li key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
          <label className="task-main">
            <input
              className="task-checkbox"
              type="checkbox"
              checked={task.done}
              onChange={() => onToggleTask(task.id)}
            />
            {editingId === task.id ? (
              <input
                className="task-edit-input"
                type="text"
                value={draftText}
                onChange={(event) => setDraftText(event.target.value)}
                aria-label={`Edit ${task.text}`}
              />
            ) : (
              <span>{task.text}</span>
            )}
          </label>

          <div className="task-actions">
            {editingId === task.id ? (
              <button type="button" onClick={() => saveEditing(task.id)} className="btn btn-primary">
                Save
              </button>
            ) : (
              <button type="button" onClick={() => startEditing(task)} className="btn btn-secondary">
                Edit
              </button>
            )}
            <button type="button" onClick={() => onDeleteTask(task.id)} className="btn btn-danger">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
