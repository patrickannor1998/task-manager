import { useMemo, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const FILTERS = ['all', 'pending', 'done'];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const pendingCount = useMemo(() => tasks.filter((task) => !task.done).length, [tasks]);

  const visibleTasks = useMemo(() => {
    if (filter === 'pending') {
      return tasks.filter((task) => !task.done);
    }

    if (filter === 'done') {
      return tasks.filter((task) => task.done);
    }

    return tasks;
  }, [filter, tasks]);

  const handleAddTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
  };

  const handleToggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task))
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (taskId, updatedText) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, text: updatedText } : task))
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Task Manager</h1>
          <p>Pending tasks: {pendingCount}</p>
        </div>
        <div className="filter-bar" role="toolbar" aria-label="Task filters">
          {FILTERS.map((filterOption) => (
            <button
              key={filterOption}
              type="button"
              className={filter === filterOption ? 'filter-chip active' : 'filter-chip'}
              onClick={() => setFilter(filterOption)}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={visibleTasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />
    </div>
  );
}
