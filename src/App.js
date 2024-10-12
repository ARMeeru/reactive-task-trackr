import React, { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import AllTaskList from "./components/AllTaskList";
import Header from "./components/Header";
import PinnedTaskList from "./components/PinnedTaskList";
import "./tailwind.css";

export default function App() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error("Error retrieving tasks from localStorage:", error);
    }
  }, []);

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Error saving tasks to localStorage:", error);
      }
    }
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const togglePin = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, pinned: !task.pinned } : task
      )
    );
  };

  // eslint-disable-next-line
  const addDeadline = (id, deadline) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, deadline: deadline } : task
      )
    );
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <PinnedTaskList
          tasks={tasks.filter((task) => task.pinned)}
          onDelete={deleteTask}
          onTogglePin={togglePin}
        />
        <div className="w-1/2 p-4">
          <AddTask onAdd={addTask} />
        </div>
        <AllTaskList
          tasks={tasks.filter((task) => !task.pinned)}
          onDelete={deleteTask}
          onTogglePin={togglePin}
        />
      </div>
    </div>
  );
}
