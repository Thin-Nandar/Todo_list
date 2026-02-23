import React, { useState } from 'react';
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, task: "Walk everyday in the morning", completed: false }
  ]);

  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("All"); // New state for filter

  // Add or Update task
  const handleAdd = () => {
    if (text.trim() === "") return;

    if (isEditing) {
      const updatedTodos = todos.map(todo =>
        todo.id === editId ? { ...todo, task: text } : todo
      );
      setTodos(updatedTodos);
      setIsEditing(false);
      setEditId(null);
    } else {
      const newTask = {
        id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1,
        task: text,
        completed: false
      };
      setTodos([...todos, newTask]);
    }

    setText("");
  };

  // Delete task
  const handleDelete = (id) => {
    const filtered = todos.filter(todo => todo.id !== id);
    setTodos(filtered);
  };

  // Edit task
  const handleEdit = (id) => {
    const editTodo = todos.find(todo => todo.id === id);
    setText(editTodo.task);
    setIsEditing(true);
    setEditId(id);
  };

  // Toggle completed
  const handleToggle = (id) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  // Clear completed tasks
  const handleClear = () => {
    const filtered = todos.filter(todo => !todo.completed);
    setTodos(filtered);
  };

  // Filtered todos based on filter state
  const filteredTodos = todos.filter(todo => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true; // All
  });

  return (
    <div className='bg-[#FFA6A6] p-4 mt-5'>
      <div className="flex items-center justify-center h-screen">
        <div className="border p-7">

          {/* Header */}
          <div className="bg-[#FF7070] py-4 px-4 w-120">
            <h1 className="text-white text-3xl">Todo list</h1>
          </div>

          {/* Form */}
          <div className='mt-8 flex justify-between'>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type='text'
              placeholder='Type Here...'
              className='border p-2 w-[80%] rounded-tr-none'
            />
            <button
              onClick={handleAdd}
              className="bg-[#FF7070] text-white border w-[20%] flex items-center justify-center p-2 cursor-pointer"
            >
              {isEditing ? "Update" : "+"}
            </button>
          </div>

          {/* Filter Buttons */}
          <div className='mt-5 flex items-center justify-between'>
            <div className='flex gap-1'>
              {["All", "Active", "Completed"].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`border-[#FF7070] border p-3 text-black cursor-pointer ${
                    filter === f ? "bg-[#EB4C4C] text-white" : ""
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className='flex items-center gap-4'>
              <p>({todos.filter(todo => todo.completed).length}/{todos.length})</p>
              <button
                onClick={handleClear}
                className='underline text-red-600'
              >
                Clear
              </button>
            </div>
          </div>

          {/* Todo List */}
          <div className='bg-white p-4 mt-5'>
            {filteredTodos.map(todo => (
              <div
                key={todo.id}
                className="mt-5 flex justify-between items-center border p-3"
              >
                <div className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                  />
                  <label
                    className={todo.completed ? "line-through text-gray-500" : ""}
                  >
                    {todo.task}
                  </label>
                </div>

                <div className='flex items-center gap-4'>
                  <button
                    onClick={() => handleEdit(todo.id)}
                    className='bg-[#7094ff] text-white cursor-pointer p-2 rounded'
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className='bg-red-600 text-white cursor-pointer p-2 rounded'
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;