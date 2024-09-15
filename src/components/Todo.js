import "./Todo.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Todo() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isNewTask, setIsNewTask] = useState(true);
  const [currentTask, setCurrentTask] = useState({});

  const client = axios.create({
    baseURL: "http://localhost:4000",
  });

  useEffect(() => {
    client.get("/todos").then((response) => {
      setTasks(response.data.data);
    });
  }, []);

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };

  const addTask = () => {
    setIsNewTask(true);
    if (taskInput) {
      client
        .post("/todo", {
          task: taskInput,
        })
        .then((response) => {
          setTasks(response.data.data);
        });
      setTaskInput("");
    }
  };

  const editTask = (todo) => {
    setIsNewTask(false);
    setTaskInput(todo.task);
    setCurrentTask(todo);
  };

  const updateTask = () => {
    client
      .put("/todo/" + currentTask.id, { task: taskInput })
      .then((response) => {
        setTasks(response.data.data);
      });
    setCurrentTask({});
    setTaskInput("");
  };

  const removeTask = (id) => {
    client.delete("/todo/" + id).then((response) => {
      setTasks(response.data.data);
    });
  };

  return (
    <div className="App">
      <h1>Todo Application</h1>
      <input onChange={handleChange} value={taskInput} id="task" name="task" />
      <button id="taskButton" onClick={isNewTask ? addTask : updateTask}>
        {isNewTask ? "Add" : "Update"}
      </button>
      <ul id="todolist">
        {tasks.map((todo) => (
          <li key={todo.id}>
            {todo.task}
            <button
              key={todo.id + "e"}
              className="editButton"
              onClick={() => editTask(todo)}
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
