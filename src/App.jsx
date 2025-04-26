import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState({
    form: false,
    taskList: false,
    completedTasks: false,
  });

  function toggleContainer(containerName) {
    const prev = isOpen[containerName];

    const newObj = { ...isOpen };

    newObj[containerName] = !prev;

    setIsOpen(newObj);
  }

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
        {isOpen.form && <TaskForm />}
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

function TaskForm() {
  return (
    <form action="" className="task-form">
      <input type="text" value={""} placeholder="Task title" required />
      <select name="dima">
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input type="datetime-local" required value={""} />
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
