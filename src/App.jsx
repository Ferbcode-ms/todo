import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(null);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing !== null) {
      setTasks(tasks.map((t, i) => (i === editing ? { ...task } : t)));
      setEditing(null);
    } else {
      setTasks([...tasks, task]);
    }
    setTask({ title: "", description: "" }); // Correctly reset the `task` state
  };

  const handleEdit = (index) => {
    setEditing(index);
    setTask(tasks[index]);
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="container">
        <h1>TODO LIST </h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="inputfield"
            type="text"
            name="title"
            placeholder="title"
            value={task.title}
            onChange={handleChange}
            required
          />
          <input
            className="inputfield"
            type="text"
            name="description"
            placeholder="description"
            value={task.description}
            onChange={handleChange}
            required
          />
          <button className="btn" type="submit">
            {editing !== null ? "Update Task" : "Add Task"}
          </button>
        </form>

        {/* Display tasks */}
        <ul>
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((t, i) => (
              <li key={i} className="box">
                <h3 id="title">{t.title}</h3>
                <p id="des">{t.description}</p>
                <button className="btn" onClick={() => handleEdit(i)}>
                  Edit
                </button>
                <button className="btn" onClick={() => handleDelete(i)}>
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p>No tasks</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
