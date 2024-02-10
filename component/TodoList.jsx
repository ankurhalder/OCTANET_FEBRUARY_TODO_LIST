import { useState, useEffect } from "react";

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
    <div className="todo-list">
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Add new todo"
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
              <button onClick={() => handleDeleteTodo(index)}>Delete</button>
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
              <button onClick={() => handleDeleteTodo(index)}>Delete</button>
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
              <button onClick={() => handleDeleteTodo(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
