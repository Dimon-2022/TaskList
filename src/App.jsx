import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState({
    form: true,
    taskList: true,
    completedTasks: true,
  });

  function toggleContainer(containerName) {
    setIsOpen((prev) => ({
      ...prev,
      [containerName]: !prev[containerName],
    }));
  }

  function addTask(task) {
    setTasks([...tasks, { ...task, completed: false, id: Date.now() }]);
  }

  console.log(tasks);

  return (
    <div className="app">
      <div className="task-container">
        <h1>Task List with Priority</h1>
        <button
          className={`close-button ${isOpen.form ? "open" : ""}`}
          onClick={() => {
            toggleContainer("form");
          }}
        >
          +
        </button>
        {isOpen.form && <TaskForm addTask={addTask} />}
      </div>

      <div className="task-container">
        <h2>Tasks</h2>
        <button
          className={`close-button ${isOpen.taskList ? "open" : ""}`}
          onClick={() => {
            toggleContainer("taskList");
          }}
        >
          +
        </button>
        {isOpen.taskList && (
          <>
            <div className="sort-controls">
              <button className="sort-button">By Date</button>
              <button className="sort-button">By Priority</button>
            </div>
            <TaskList />
          </>
        )}
      </div>

      <div className="completed-task-container">
        <h2>Completed Task</h2>
        <button
          className={`close-button ${isOpen.completedTasks ? "open" : ""}`}
          onClick={() => {
            toggleContainer("completedTasks");
          }}
        >
          +
        </button>
        {isOpen.completedTasks && <CompletedTaskList />}
      </div>
      <Footer />
    </div>
  );
}

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");

  function submitForm(e) {
    e.preventDefault();

    if (title.trim() && deadline) {
      const task = { title, priority, deadline };
      addTask(task);
      setTitle('');
      setPriority('Low');
      setDeadline('');
    }

  }

  return (
    <form action="" className="task-form" onSubmit={submitForm}>
      <input
        type="text"
        value={title}
        placeholder="Task title"
        required
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <select
        value={priority}
        onChange={(e) => {
          setPriority(e.target.value);
        }}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="datetime-local"
        required
        value={deadline}
        onChange={(e) => {
          setDeadline(e.target.value);
        }}
      />
      <button type="submit">Add task</button>
    </form>
  );
}

function TaskList() {
  return (
    <ul className="task-list">
      <TaskItem />
    </ul>
  );
}

function CompletedTaskList() {
  return (
    <ul className="completed-task-list">
      <TaskItem />
    </ul>
  );
}

function TaskItem() {
  return (
    <li className="task-item">
      <div className="task-info">
        <div>
          Title <strong>Medium</strong>
        </div>
        <div className="task-deadline">Due: {new Date().toLocaleString()}</div>
      </div>
      <div className="task-buttons">
        <button className="complete-button">Complete</button>
        <button className="delete-button">Delete</button>
      </div>
    </li>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        Technologies and React concepts used: React, JSX, props, useStete,
        component composition, conditional rendering, array methods(map,
        filter), event handling.
      </p>
    </footer>
  );
}

export default App;
