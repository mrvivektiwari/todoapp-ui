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
      setTasks([
        ...tasks,
        {
          id: Math.floor(Math.random() * (10000 - 100 + 1) + 100),
          task: taskInput,
        },
      ]);
      setTaskInput("");
    }
  };

  const editTask = (task, id) => {
    setIsNewTask(false);
    setTaskInput(task);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="App">
      <h1>Todo Application</h1>
      <input onChange={handleChange} value={taskInput} id="task" name="task" />
      <button id="taskButton" onClick={addTask}>
        {isNewTask ? "Add" : "Update"}
      </button>
      <ul id="todolist">
        {tasks.map((todo) => (
          <li key={todo.id}>
            {todo.task}
            <button
              key={todo.id + "e"}
              className="editButton"
              onClick={() => editTask(todo.task, todo.id)}
            >
              Edit
            </button>
            <button
              key={todo.id + "d"}
              className="deleteButton"
              onClick={() => removeTask(todo.id)}
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
