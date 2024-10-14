import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import AddTask from "../AddTask";

describe("AddTask Component", () => {
  const mockOnAdd = jest.fn();

  test("renders AddTask form with inputs and button", () => {
    render(<AddTask onAdd={mockOnAdd} />);

    // Check if input fields and button are rendered
    expect(screen.getByPlaceholderText(/Task Title/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Task Description/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Task/i)).toBeInTheDocument();
  });

  test("calls onAdd with task data when form is submitted", () => {
    render(<AddTask onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByPlaceholderText(/Task Title/i), {
      target: { value: "Test Task" },
    });

    fireEvent.change(screen.getByPlaceholderText(/Task Description/i), {
      target: { value: "Test Description" },
    });

    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: "2023-12-31" },
    });

    fireEvent.click(screen.getByText(/Add Task/i));

    expect(mockOnAdd).toHaveBeenCalledWith({
      id: expect.any(Number),
      title: "Test Task",
      description: "Test Description",
      deadline: "2023-12-31",
      completed: false,
      pinned: false,
    });
  });

  test("shows alert when form is submitted with empty fields", () => {
    window.alert = jest.fn();
    render(<AddTask onAdd={mockOnAdd} />);

    fireEvent.click(screen.getByText(/Add Task/i));

    expect(window.alert).toHaveBeenCalledWith("Please fill in all fields");
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  test("clears input fields after form submission", () => {
    render(<AddTask onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByPlaceholderText(/Task Title/i), {
      target: { value: "Test Task" },
    });

    fireEvent.change(screen.getByPlaceholderText(/Task Description/i), {
      target: { value: "Test Description" },
    });

    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: "2023-12-31" },
    });

    fireEvent.click(screen.getByText(/Add Task/i));

    expect(screen.getByPlaceholderText(/Task Title/i).value).toBe("");
    expect(screen.getByPlaceholderText(/Task Description/i).value).toBe("");
    expect(screen.getByLabelText(/Date/i).value).toBe("");
  });
});
