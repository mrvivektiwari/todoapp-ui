import "./Todo.css";

function Todo() {
  return (
    <div className="App">
      <h1>Todo Application</h1>
      <input value="" id="task" name="task" />
      <button id="taskButton" onclick="addTask()">
        Add
      </button>
      <ul id="todolist"></ul>
    </div>
  );
}

export default Todo;
