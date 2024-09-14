import "./Todo.css";
import { useState } from "react";

function Todo() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState(["s"]);

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };

  const addTask = () => {
    if (taskInput) {
      setTasks([...tasks, taskInput]);
      setTaskInput("");
    }
  };

  return (
    <div className="App">
      <h1>Todo Application</h1>
      <input onChange={handleChange} value={taskInput} id="task" name="task" />
      <button id="taskButton" onClick={addTask}>
        Add
      </button>
      <ul id="todolist">
        {tasks.map((task) => (
          <>
            <li key={task}>{task}</li>
            <button className="editButton" onClick="editTask()">
              Edit
            </button>
            <button className="deleteButton" onClick="removeTask()">
              Remove
            </button>
          </>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
