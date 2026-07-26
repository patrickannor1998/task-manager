import { useState } from 'react';

export default function TaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!taskText.trim()) return;

    onAddTask(taskText.trim());
    setTaskText('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        className="task-input"
        type="text"
        value={taskText}
        onChange={(event) => setTaskText(event.target.value)}
        placeholder="Add a task"
        aria-label="Task input"
      />
      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
}
