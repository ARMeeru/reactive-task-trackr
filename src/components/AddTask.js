import React, { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !deadline) {
      alert("Please fill in all fields");
      return;
    }

    const newTask = {
      id: Math.floor(Math.random() * 10000),
      title,
      description,
      deadline,
      completed: false,
      pinned: false,
    };

    onAdd(newTask);
    setTitle("");
    setDescription("");
    setDeadline("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="task-form w-2/6 p-8 bg-white shadow-lg rounded-lg mx-auto my-8"
    >
      <div>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field w-full mb-4 p-2 border rounded"
        />
      </div>
      <div>
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field w-full mb-4 p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="input-field w-full mb-4 p-2 border rounded"
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
