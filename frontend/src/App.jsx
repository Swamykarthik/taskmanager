import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!title) return;

    try {
      await axios.post(`${API}/tasks`, {
        title,
        status: "pending"
      });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Update status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/tasks/${id}`, {
        status,
        completedAt: status === "completed" ? new Date() : null
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Dashboard logic
  const completed = tasks.filter((t) => t.status === "completed");
  const inProgress = tasks.filter((t) => t.status === "in-progress");

  const progress = tasks.length
    ? (completed.length / tasks.length) * 100
    : 0;

  return (
    <div className="container">

      {/* 🔥 BACKGROUND ANIMATION */}
      <div className="bg-blur bg1"></div>
      <div className="bg-blur bg2"></div>
      <div className="bg-blur bg3"></div>

      {/* Header */}
      <div className="header">
        <h1>Smart Task Manager</h1>
        <p>Manage your tasks efficiently</p>
      </div>

      {/* Dashboard */}
      <div className="dashboard">
        <div className="card glass">
          <p>Total</p>
          <h2>{tasks.length}</h2>
        </div>

        <div className="card glass">
          <p>In Progress</p>
          <h2>{inProgress.length}</h2>
        </div>

        <div className="card glass">
          <p>Completed</p>
          <h2>{completed.length}</h2>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="glass progress-box">
        <p>Overall Progress</p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span>{progress.toFixed(0)}%</span>
      </div>

      {/* Add Task */}
      <div className="glass input-box">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Task List */}
      {tasks.map((t) => (
        <div className="task" key={t._id}>
          <div className="task-card">

            <h3>{t.title}</h3>
            <p>Status: {t.status}</p>

            {/* Completion date */}
            {t.completedAt && (
              <p className="date">
                Completed: {new Date(t.completedAt).toLocaleDateString()}
              </p>
            )}

            <div className="btn-group">

              <button onClick={() => updateStatus(t._id, "in-progress")}>
                Start
              </button>

              <button onClick={() => updateStatus(t._id, "completed")}>
                Complete
              </button>

              <button onClick={() => deleteTask(t._id)}>
                Delete
              </button>

            </div>

          </div>
        </div>
      ))}

    </div>
  );
}

export default App;