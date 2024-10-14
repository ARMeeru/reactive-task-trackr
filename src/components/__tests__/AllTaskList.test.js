import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import AllTaskList from "../AllTaskList";

const mockOnDelete = jest.fn();
const mockOnTogglePin = jest.fn();

test("applies correct class based on task deadline and completion status", () => {
  const tasksWithDifferentStatuses = [
    {
      id: 1,
      title: "Completed Task",
      description: "This task is completed",
      deadline: "2023-12-31",
      completed: true,
      pinned: false,
    },
    {
      id: 2,
      title: "Overdue Task",
      description: "This task is overdue",
      deadline: "2022-01-01",
      completed: false,
      pinned: false,
    },
    {
      id: 3,
      title: "Due Soon Task",
      description: "This task is due soon",
      deadline: new Date(
        new Date().setDate(new Date().getDate() + 3)
      ).toISOString(),
      completed: false,
      pinned: false,
    },
    {
      id: 4,
      title: "Default Task",
      description: "This task has a normal deadline",
      deadline: new Date(
        new Date().setDate(new Date().getDate() + 10)
      ).toISOString(),
      completed: false,
      pinned: false,
    },
  ];

  render(
    <AllTaskList
      tasks={tasksWithDifferentStatuses}
      onDelete={mockOnDelete}
      onTogglePin={mockOnTogglePin}
    />
  );

  expect(screen.getByTestId("task-item-1")).toHaveClass("task-completed");
  expect(screen.getByTestId("task-item-2")).toHaveClass("task-red");
  expect(screen.getByTestId("task-item-3")).toHaveClass("task-yellow");
  expect(screen.getByTestId("task-item-4")).toHaveClass("task-default");
});

test("calls onTogglePin when the Pin button is clicked", () => {
  const tasks = [
    {
      id: 1,
      title: "Task 1",
      description: "This is task 1",
      deadline: "2023-12-31",
      completed: false,
      pinned: false,
    },
  ];

  render(
    <AllTaskList
      tasks={tasks}
      onDelete={mockOnDelete}
      onTogglePin={mockOnTogglePin}
    />
  );

  fireEvent.click(screen.getByText("Pin"));
  expect(mockOnTogglePin).toHaveBeenCalledWith(1); // Check if onTogglePin was called with the correct ID
});

test("calls onDelete when the Delete button is clicked", () => {
  const tasks = [
    {
      id: 1,
      title: "Task 1",
      description: "This is task 1",
      deadline: "2023-12-31",
      completed: false,
      pinned: false,
    },
  ];

  render(
    <AllTaskList
      tasks={tasks}
      onDelete={mockOnDelete}
      onTogglePin={mockOnTogglePin}
    />
  );

  fireEvent.click(screen.getByText("Delete"));
  expect(mockOnDelete).toHaveBeenCalledWith(1); // Check if onDelete was called with the correct ID
});
