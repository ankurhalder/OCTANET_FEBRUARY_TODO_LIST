import { useState, useEffect } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [priority, setPriority] = useState("1"); // Default priority is high

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
        priority: parseInt(priority),
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
    setPriority(todos[index].priority.toString());
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
        <option value="1">High</option>
        <option value="2">Medium</option>
        <option value="3">Low</option>
      </select>
      <button onClick={handleAddTodo}>
        {editIndex !== null ? "Update" : "Add"}
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={`priority-${todo.priority}`}>
            {todo.text}
            <span className="priority">Priority: {todo.priority}</span>
            <button onClick={() => handleEditTodo(index)}>Edit</button>
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
