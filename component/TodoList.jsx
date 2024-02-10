import { Fragment, useState, useEffect } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [priority, setPriority] = useState("high");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  const saveTodosToLocalStorage = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        text: inputValue,
        priority: priority,
      };
      if (editIndex !== null) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = newTodo;
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
      }
      saveTodosToLocalStorage(todos);
      setInputValue("");
    }
  };

  const handleEditTodo = (index) => {
    setInputValue(todos[index].text);
    setPriority(todos[index].priority);
    setEditIndex(index);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const filteredTodos = {
    high: todos.filter((todo) => todo.priority === "high"),
    medium: todos.filter((todo) => todo.priority === "medium"),
    low: todos.filter((todo) => todo.priority === "low"),
  };

  return (
    <Fragment>
      <div className="todo-list-container">
        <h1>My Toodle</h1>
        <input
          type="text"
          placeholder="Type your todo here..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <select value={priority} onChange={handlePriorityChange}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={handleAddTodo}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
        <div className="todo-list">
          <div className="priority-section">
            <h2>High Priority</h2>
            <ul>
              {filteredTodos.high.map((todo, index) => (
                <li
                  key={index}
                  className="priority-high"
                  onClick={() => handleEditTodo(index)}
                >
                  {todo.text}
                  <button onClick={() => handleDeleteTodo(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="priority-section">
            <h2>Medium Priority</h2>
            <ul>
              {filteredTodos.medium.map((todo, index) => (
                <li
                  key={index}
                  className="priority-medium"
                  onClick={() => handleEditTodo(index)}
                >
                  {todo.text}
                  <button onClick={() => handleDeleteTodo(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="priority-section">
            <h2>Low Priority</h2>
            <ul>
              {filteredTodos.low.map((todo, index) => (
                <li
                  key={index}
                  className="priority-low"
                  onClick={() => handleEditTodo(index)}
                >
                  {todo.text}
                  <button onClick={() => handleDeleteTodo(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TodoList;
