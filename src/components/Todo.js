import "./Todo.css";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function Todo() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isNewTask, setIsNewTask] = useState(true);
  const [currentTask, setCurrentTask] = useState({});

  const client = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  const refreshTask = useCallback(() => {
    client.get("/api/todos").then((response) => {
      setTasks(response.data.data);
    });
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  
  useEffect(() => {
    refreshTask();
  }, [refreshTask]);

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };

  const addTask = () => {
    setIsNewTask(true);
    if (taskInput) {
      client
        .post("/api/todo", {
          task: taskInput,
        })
        .then((response) => {
          refreshTask();
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
      .put("/api/todo/" + currentTask.id, { task: taskInput })
      .then((response) => {
        refreshTask();
      });
    setCurrentTask({});
    setTaskInput("");
    setIsNewTask(true);
  };

  const removeTask = (id) => {
    client.delete("/api/todo/" + id).then((response) => {
      refreshTask();
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
