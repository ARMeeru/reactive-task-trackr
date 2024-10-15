import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import PinnedTaskList from "../PinnedTaskList";

describe("PinnedTaskList Component", () => {
  const tasks = [
    {
      id: 1,
      title: "Pinned Task 1",
      description: "Pinned Desc 1",
      deadline: "2023-12-31",
      completed: false,
      pinned: true,
    },
    {
      id: 2,
      title: "Pinned Task 2",
      description: "Pinned Desc 2",
      deadline: "2023-11-30",
      completed: false,
      pinned: true,
    },
  ];

  const mockOnDelete = jest.fn();
  const mockOnTogglePin = jest.fn();

  test("renders pinned task list correctly", () => {
    render(
      <PinnedTaskList
        tasks={tasks}
        onDelete={mockOnDelete}
        onTogglePin={mockOnTogglePin}
      />
    );

    expect(screen.getByText("Pinned Task 1")).toBeInTheDocument();
    expect(screen.getByText("Pinned Desc 1")).toBeInTheDocument();
    expect(screen.getByText(/2023-12-31/i)).toBeInTheDocument();

    expect(screen.getByText("Pinned Task 2")).toBeInTheDocument();
    expect(screen.getByText("Pinned Desc 2")).toBeInTheDocument();
    expect(screen.getByText(/2023-11-30/i)).toBeInTheDocument();
  });

  test("calls onDelete when delete button is clicked", () => {
    render(
      <PinnedTaskList
        tasks={tasks}
        onDelete={mockOnDelete}
        onTogglePin={mockOnTogglePin}
      />
    );

    fireEvent.click(screen.getAllByText(/Delete/i)[0]);
    expect(mockOnDelete).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getAllByText(/Delete/i)[1]);
    expect(mockOnDelete).toHaveBeenCalledWith(2);
  });

  test("calls onTogglePin when unpin button is clicked", () => {
    render(
      <PinnedTaskList
        tasks={tasks}
        onDelete={mockOnDelete}
        onTogglePin={mockOnTogglePin}
      />
    );

    fireEvent.click(screen.getAllByText(/Unpin/i)[0]);
    expect(mockOnTogglePin).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getAllByText(/Unpin/i)[1]);
    expect(mockOnTogglePin).toHaveBeenCalledWith(2);
  });

  test("applies correct class based on task status", () => {
    const tasksWithDifferentStatuses = [
      {
        id: 1,
        title: "Completed Task",
        description: "This task is completed",
        deadline: "2023-12-31",
        completed: true,
        pinned: true,
      },
      {
        id: 2,
        title: "Overdue Task",
        description: "This task is overdue",
        deadline: "2022-12-31",
        completed: false,
        pinned: true,
      },
      {
        id: 3,
        title: "Due Soon Task",
        description: "This task is due soon",
        deadline: new Date(new Date().setDate(new Date().getDate() + 3))
          .toISOString()
          .split("T")[0],
        completed: false,
        pinned: true,
      },
      {
        id: 4,
        title: "Default Task",
        description: "This task is neither completed nor due soon",
        deadline: new Date(new Date().setDate(new Date().getDate() + 10))
          .toISOString()
          .split("T")[0],
        completed: false,
        pinned: true,
      },
    ];

    render(
      <PinnedTaskList
        tasks={tasksWithDifferentStatuses}
        onDelete={mockOnDelete}
        onTogglePin={mockOnTogglePin}
      />
    );

    // Use data-testid to select each task div based on the id
    expect(screen.getByTestId("pinned-task-item-1")).toHaveClass(
      "task-completed"
    );
    expect(screen.getByTestId("pinned-task-item-2")).toHaveClass("task-red");
    expect(screen.getByTestId("pinned-task-item-3")).toHaveClass("task-yellow");
    expect(screen.getByTestId("pinned-task-item-4")).toHaveClass(
      "task-default"
    );
  });
});
