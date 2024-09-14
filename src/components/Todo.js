import "./Todo.css";
import { useState } from "react";

function Todo() {
  const [taskInput, setTaskInput] = useState("");

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };

  return (
    <div className="App">
      <h1>Todo Application</h1>
      <input onChange={handleChange} value={taskInput} id="task" name="task" />
      <button id="taskButton" onclick="addTask()">
        Add
      </button>
      <ul id="todolist"></ul>
    </div>
  );
}

export default Todo;
