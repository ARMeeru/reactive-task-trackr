import React from "react";

const AllTaskList = ({ tasks, onDelete, onTogglePin }) => {
  const getTaskClass = (task) => {
    const deadline = new Date(task.deadline);
    const now = new Date();
    const diffInDays = (deadline - now) / (1000 * 60 * 60 * 24);

    if (task.completed) return "task-completed";
    if (diffInDays < 0) return "task-red";
    if (diffInDays <= 7) return "task-yellow";
    return "task-default";
  };

  return (
    <div className="all-tasks w-2/6 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">All Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id} className={getTaskClass(task)}>
          <h3 className="task-title">{task.title}</h3>
          <p className="task-desc">{task.description}</p>
          <p className="task-date">Deadline: {task.deadline}</p>
          <button
            onClick={() => onTogglePin(task.id)}
            className="text-blue-500 mt-2"
          >
            Pin
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 ml-4 mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllTaskList;
