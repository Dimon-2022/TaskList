import { useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [tasks, setTasks] = useState([]);
  const [sortType, setSortType] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
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

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function completeTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  }

  function sortTask(tasks) {
    return tasks.slice().sort((a, b) => {
      if (sortType === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return sortOrder === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        return sortOrder === "asc"
          ? new Date(a.deadline) - new Date(b.deadline)
          : new Date(b.deadline) - new Date(a.deadline);
      }
    });
  }

  function toggleSortOrder(type) {
    if (sortType === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortOrder("asc");
    }
  }

  const activeTasks = sortTask(tasks.filter((task) => !task.completed));
  const completedTasks = tasks.filter((task) => task.completed);

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
              <button
                className={`sort-button ${sortType === "date" ? "active" : ""}`}
                onClick={() => toggleSortOrder("date")}
              >
                By Date {sortType === "date" && (sortOrder === "asc" ? "\u2191" : "\u2193")}
              </button>
              <button
                className={`sort-button ${sortType === "priority" ? "active" : ""}`}
                onClick={() => toggleSortOrder("priority")}
              >
                By Priority {sortType === "priority" && (sortOrder === "asc" ? "\u2191" : "\u2193")}
              </button>
            </div>
            <TaskList
              completeTask={completeTask}
              deleteTask={deleteTask}
              activeTasks={activeTasks}
            />
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
        {isOpen.completedTasks && (
          <CompletedTaskList
            completedTasks={completedTasks}
            deleteTask={deleteTask}
          />
        )}
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
      setTitle("");
      setPriority("Low");
      setDeadline("");
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

function TaskList({ activeTasks, deleteTask, completeTask }) {
  return (
    <ul className="task-list">
      {activeTasks.map((task) => (
        <TaskItem
          completeTask={completeTask}
          deleteTask={deleteTask}
          task={task}
          key={task.id}
        />
      ))}
    </ul>
  );
}

function CompletedTaskList({ completedTasks, deleteTask }) {
  return (
    <ul className="completed-task-list">
      {completedTasks.map((task) => (
        <TaskItem task={task} key={task.id} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}

function TaskItem({ task, deleteTask, completeTask }) {
  const { title, priority, deadline, id, completed } = task;
  return (
    <li className={`task-item ${priority.toLowerCase()}`}>
      <div className="task-info">
        <div>
          {title} <strong>{priority}</strong>
        </div>
        <div className="task-deadline">
          Due: {new Date(deadline).toLocaleString()}
        </div>
      </div>
      <div className="task-buttons">
        {!completed && (
          <button className="complete-button" onClick={() => completeTask(id)}>
            Complete
          </button>
        )}
        <button className="delete-button" onClick={() => deleteTask(id)}>
          Delete
        </button>
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
