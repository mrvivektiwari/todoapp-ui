import "./Todo.css";
import { useState } from "react";

function Todo() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isNewTask, setIsNewTask] = useState(true);

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };

  const addTask = () => {
    setIsNewTask(true);
    if (taskInput) {
      setTasks([...tasks, taskInput]);
      setTaskInput("");
    }
  };

  const editTask = (task) => {
    setIsNewTask(false);
    setTaskInput(task);
    setTasks(tasks.filter((t) => t !== task));
  };

  const removeTask = (task) => {
    setTasks(tasks.filter((t) => t !== task));
  };

  return (
    <div className="App">
      <h1>Todo Application</h1>
      <input onChange={handleChange} value={taskInput} id="task" name="task" />
      <button id="taskButton" onClick={addTask}>
        {isNewTask ? "Add" : "Update"}
      </button>
      <ul id="todolist">
        {tasks.map((task) => (
          <li key={task}>
            {task}
            <button
              key={task + "e"}
              className="editButton"
              onClick={() => editTask(task)}
            >
              Edit
            </button>
            <button
              key={task + "d"}
              className="deleteButton"
              onClick={() => removeTask(task)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
