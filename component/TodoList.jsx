import { useState, useEffect } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [priority, setPriority] = useState("high"); // Default priority is high

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

  // Sort todos based on priority
  const sortedTodos = todos.sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

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
      <ul>
        {sortedTodos.map((todo, index) => (
          <li
            key={index}
            className={`priority-${todo.priority}`}
            style={{ fontWeight: "bold", color: getColor(todo.priority) }}
          >
            {todo.text} ({todo.priority})
            <button onClick={() => handleEditTodo(index)}>Edit</button>
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

function getColor(priority) {
  switch (priority) {
    case "high":
      return "red";
    case "medium":
      return "orange";
    case "low":
      return "green";
    default:
      return "black";
  }
}
